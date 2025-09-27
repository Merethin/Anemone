import { getButtonElement, getElement, getInputElement, setText } from '../htmllib';
import { estimateProduction, fetchNukeStats, readNukeStatsPuppets, updateNukeStats } from '../nukepage';
import Mousetrap from 'mousetrap';
import { keybinds, loadKeybind } from '../keybinds';
import { canonicalize, NSScript, prettify } from '../../nsdotjs/src/nsdotjs';
import { checkPageRegex, generateRandomNumber } from '../lib';
import { readConfigRecord } from '../config';
import { cleanupNation } from '../endpoints';
import { FactionStats, fetchFactionStats, queryNationsPage } from '../factionpage';
import { cleanupHtml } from './html/cleanup';

let fid = parseInt(checkPageRegex(/fid=([0-9]+)/) || "0");

const puppets = readConfigRecord("puppets");
const puppetStats = Object.entries(readNukeStatsPuppets()).filter(([_, stats]) => {
    if(stats.isDestroyed) return false;
    return stats.nukeType == "Cleanup";
}).map(value => ({value, sort: estimateProduction(value[1]) + generateRandomNumber(-150, 150)})).sort(
    (a, b) => b.sort - a.sort
).map(({ value }) => value);

let index = 0;
let currentNation = "";
let currentTarget = "";
let prodAmount = 0;

let nationsToClean = new Array<string>();

let cleanFactionData: FactionStats | null = null;

const CLEANUP_COST = 700;

enum CleanAction {
    Login,
    QuerySelf,
    FindTarget,
    QueryTarget,
    Cleanup,
    Finish,
}

let cleanupState = CleanAction.Login;

function updateProgress() {
    setText("progress", `Progress: ${index}/${puppetStats.length}`);

    if(nationsToClean.length == 0) {
        setText("targets", `Nations left: 0 (finding random nations in faction)`);
    } else {
        setText("targets", `Nations left: ${nationsToClean.length}`);
    }

    if(index >= Object.keys(puppetStats).length) setText("action", `Done`);
}

function importNations(csv: string) {
    csv.split("\n").forEach((value) => {
        if(!value.length) return;
        nationsToClean.push(canonicalize(value));
    });

    console.log(nationsToClean);
    updateProgress();
}

export function setupCleanupPage() {
    // Insert main HTML
    let container = document.createElement("div");
    container.innerHTML = cleanupHtml;
    getElement("content").appendChild(container);

    updateProgress();

    getButtonElement("action").onclick = () => {
        Mousetrap.trigger(loadKeybind(keybinds.action));
    };

    getInputElement('csv-import-nations').addEventListener('change', function(event) {
        const element = (event.target as HTMLInputElement);
        let fileList: FileList | null = element.files;

        if (fileList && fileList.length) {
            let file = fileList[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const content = e.target?.result;
                importNations(content as string);
            };

            reader.readAsText(file);
        }
    });

    return cleanup;
}

export async function cleanup(script: NSScript) {
    switch(cleanupState) {
        case CleanAction.Login: {
            if(index >= puppetStats.length){
                index = puppetStats.length;
                updateProgress();
                cleanupState = CleanAction.Finish;
                setText("action", "Done");
                return;
            }

            let [nation, _] = puppetStats[index];

            await script.login(nation, puppets[nation]);

            updateProgress();

            index += 1;

            cleanupState = CleanAction.QuerySelf;
            currentNation = nation;
            setText("nation", `Current nation: ${prettify(currentNation)}`);
            setText("action", `Query Production for ${prettify(currentNation)}`);
            return;
        }
        case CleanAction.QuerySelf: {
            let newStats = await fetchNukeStats(script, currentNation);
            prodAmount = newStats.production;

            if(newStats.isDestroyed || prodAmount < CLEANUP_COST) {
                cleanupState = CleanAction.Login;
                setText("action", `Login to Next Nation`);
            } else {
                let target = nationsToClean.pop();
                if (target === undefined) {
                    updateProgress();
                    cleanupState = CleanAction.FindTarget;
                    setText("action", `Find Nation to Clean in Faction`);
                } else {
                    currentTarget = target;
                    cleanupState = CleanAction.QueryTarget;
                    setText("action", `Prepare to Clean ${prettify(currentTarget)}`);
                }
            }

            return;
        }
        case CleanAction.QueryTarget: {
            let targetStats = await fetchNukeStats(script, currentTarget);

            // target is not destroyed
            if(!targetStats.isDestroyed) {
                let target = nationsToClean.pop();
                if (target === undefined) {
                    updateProgress();
                    cleanupState = CleanAction.FindTarget;
                    setText("action", `Find Nation to Clean in Faction`);
                } else {
                    currentTarget = target;
                    cleanupState = CleanAction.QueryTarget;
                    setText("action", `Prepare to Clean ${prettify(currentTarget)}`);
                }
            } else {
                cleanupState = CleanAction.Cleanup;
                setText("action", `Clean ${prettify(currentTarget)}`);
            }

            return;
        }
        case CleanAction.FindTarget: {
            if(cleanFactionData == null) {
                cleanFactionData = await fetchFactionStats(script, fid);
                return;
            }

            let totalPages = Math.ceil(cleanFactionData.nations / 50);
            let page = generateRandomNumber(0, totalPages - 1);

            let nations = await queryNationsPage(script, fid, page * 50);

            let eligibleNations = nations.filter(([_, isDestroyed]) => {
                return isDestroyed;
            });
            if(!eligibleNations.length) return;

            let index = generateRandomNumber(0, eligibleNations.length - 1);
            currentTarget = eligibleNations[index][0];
            cleanupState = CleanAction.QueryTarget;
            setText("action", `Prepare to Clean ${prettify(currentTarget)}`);
            return;
        }
        case CleanAction.Cleanup: {
            await cleanupNation(script, currentTarget);

            updateProgress();

            prodAmount -= CLEANUP_COST;

            updateNukeStats(currentNation, {
                production: prodAmount, 
            });

            if(prodAmount < CLEANUP_COST) {
                cleanupState = CleanAction.Login;
                setText("action", `Login to Next Nation`);
                return;
            } else {
                let target = nationsToClean.pop();
                if (target === undefined) {
                    updateProgress();
                    cleanupState = CleanAction.FindTarget;
                    setText("action", `Find Nation to Clean in Faction`);
                } else {
                    currentTarget = target;
                    cleanupState = CleanAction.QueryTarget;
                    setText("action", `Prepare to Clean ${prettify(currentTarget)}`);
                }
            }
        }
        case CleanAction.Finish: return;
    }
}