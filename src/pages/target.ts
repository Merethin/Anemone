import { getButtonElement, getElement, getInputElement, setText } from '../htmllib';
import { fetchNukeStats, readNukeStatsPuppets } from '../nukepage';
import Mousetrap from 'mousetrap';
import { keybinds, loadKeybind } from '../keybinds';
import { canonicalize, NSScript, prettify } from '../../nsdotjs/src/nsdotjs';
import { checkPageRegex, generateRandomNumber } from '../lib';
import { readConfigRecord } from '../config';
import { targetNukesAtNation } from '../endpoints';
import { targetHtml } from './html/target';
import { FactionStats, fetchFactionStats, queryNationsPage } from '../factionpage';

let fid = parseInt(checkPageRegex(/fid=([0-9]+)/) || "0");
let defaultOverkill = parseInt(checkPageRegex(/overkill=([0-9]+)/) || "1");

const puppets = readConfigRecord("puppets");
const puppetStats = Object.entries(readNukeStatsPuppets()).filter(([_, stats]) => {
    if(stats.isDestroyed) return false;
    return stats.nukes > 0;
}).map(value => ({value, sort: value[1].nukes + generateRandomNumber(-50, 50)})).sort(
    (a, b) => b.sort - a.sort
).map(({ value }) => value);

let index = 0;
let currentNation = "";
let currentTarget = "";
let currentOverkill = 1;
let nukeAmount = 0;
let targetNukeAmount = 0;

let targets = new Array<[string, number]>();

let targetFactionData: FactionStats | null = null;

enum TargetAction {
    Login,
    QuerySelf,
    FindTarget,
    QueryTarget,
    TargetNukes,
    Finish,
}

let targetState = TargetAction.Login;

function updateProgress() {
    setText("progress", `Progress: ${index}/${puppetStats.length}`);

    if(targets.length == 0) {
        setText("targets", `Targets left: 0 (finding random nations in target faction)`);
    } else {
        setText("targets", `Targets left: ${targets.length}`);
    }

    if(index >= Object.keys(puppetStats).length) setText("action", `Done`);
}

function importTargets(csv: string) {
    csv.split("\n").forEach((value) => {
        if(!value.length) return;
        let [target, multiplier] = value.split(",", 2);
        let parsedMultiplier = parseFloat(multiplier);
        if(isNaN(parsedMultiplier)) return;
        targets.push([canonicalize(target), parsedMultiplier]);
    });

    console.log(targets);
    updateProgress();
}

export function setupTargetPage() {
    // Insert main HTML
    let container = document.createElement("div");
    container.innerHTML = targetHtml;
    getElement("content").appendChild(container);

    updateProgress();

    getButtonElement("action").onclick = () => {
        Mousetrap.trigger(loadKeybind(keybinds.action));
    };

    getInputElement('csv-import-targets').addEventListener('change', function(event) {
        const element = (event.target as HTMLInputElement);
        let fileList: FileList | null = element.files;

        if (fileList && fileList.length) {
            let file = fileList[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const content = e.target?.result;
                importTargets(content as string);
            };

            reader.readAsText(file);
        }
    });

    return target;
}

export async function target(script: NSScript) {
    switch(targetState) {
        case TargetAction.Login: {
            if(index >= puppetStats.length){
                index = puppetStats.length;
                updateProgress();
                targetState = TargetAction.Finish;
                setText("action", "Done");
                return;
            }

            let [nation, _] = puppetStats[index];

            await script.login(nation, puppets[nation]);

            updateProgress();

            index += 1;

            targetState = TargetAction.QuerySelf;
            currentNation = nation;
            setText("nation", `Current nation: ${prettify(currentNation)}`);
            setText("action", `Query Nukes for ${prettify(currentNation)}`);
            return;
        }
        case TargetAction.QuerySelf: {
            let newStats = await fetchNukeStats(script, currentNation);
            nukeAmount = newStats.nukes;

            if(newStats.isDestroyed || nukeAmount == 0) {
                targetState = TargetAction.Login;
                setText("action", `Login to Next Nation`);
            } else {
                let [target, multiplier] = targets.pop() || [undefined, 1];
                if (target === undefined) {
                    updateProgress();
                    targetState = TargetAction.FindTarget;
                    setText("action", `Find Target in Enemy Faction`);
                } else {
                    currentTarget = target;
                    currentOverkill = multiplier;
                    targetState = TargetAction.QueryTarget;
                    setText("action", `Target ${prettify(currentTarget)}`);
                }
            }

            return;
        }
        case TargetAction.QueryTarget: {
            let targetStats = await fetchNukeStats(script, currentTarget);

            // target is already destroyed
            if(targetStats.isDestroyed) {
                let [target, multiplier] = targets.pop() || [undefined, 1];
                if (target === undefined) {
                    targetState = TargetAction.FindTarget;
                    setText("action", `Find Target in Enemy Faction`);
                } else {
                    currentTarget = target;
                    currentOverkill = multiplier;
                    targetState = TargetAction.QueryTarget;
                    setText("action", `Prepare to Target ${prettify(currentTarget)}`);
                }
            } else {
                // amount of rads we want to inflict
                let targetRads = 100 - targetStats.radiation;

                // nukes required to inflict those rads with overkill
                let nukesRequired = Math.max((targetRads * 4 * currentOverkill) - targetStats.targeted, 0);

                // already enough targeted by someone else
                if(nukesRequired == 0) {
                    let [target, multiplier] = targets.pop() || [undefined, 1];
                    if (target === undefined) {
                        targetState = TargetAction.FindTarget;
                        setText("action", `Find Target in Enemy Faction`);
                    } else {
                        currentTarget = target;
                        currentOverkill = multiplier;
                        targetState = TargetAction.QueryTarget;
                        setText("action", `Prepare to Target ${prettify(currentTarget)}`);
                    }
                    return;
                }

                // not enough nukes? target again with another nation later
                if(nukesRequired > nukeAmount) {
                    targets.push([currentTarget, currentOverkill]);
                }

                targetNukeAmount = Math.min(nukeAmount, nukesRequired);
            }

            return;
        }
        case TargetAction.FindTarget: {
            if(targetFactionData == null) {
                targetFactionData = await fetchFactionStats(script, fid);
                return;
            }

            let totalPages = Math.ceil(targetFactionData.nations / 50);
            let page = generateRandomNumber(0, totalPages - 1);

            let nations = await queryNationsPage(script, fid, page * 50);

            let eligibleNations = nations.filter(([_, isDestroyed]) => {
                return !isDestroyed;
            });
            if(!eligibleNations.length) return;

            let index = generateRandomNumber(0, eligibleNations.length - 1);
            currentTarget = eligibleNations[index][0];
            currentOverkill = defaultOverkill;
            targetState = TargetAction.QueryTarget;
            setText("action", `Prepare to Target ${prettify(currentTarget)}`);
            return;
        }
        case TargetAction.TargetNukes: {
            await targetNukesAtNation(script, currentTarget, targetNukeAmount);

            updateProgress();

            nukeAmount -= targetNukeAmount;

            if(nukeAmount <= 0) {
                targetState = TargetAction.Login;
                setText("action", `Login to Next Nation`);
                return;
            } else {
                let [target, multiplier] = targets.pop() || [undefined, 1];
                if (target === undefined) {
                    targetState = TargetAction.FindTarget;
                    setText("action", `Find Target in Enemy Faction`);
                } else {
                    currentTarget = target;
                    currentOverkill = multiplier;
                    targetState = TargetAction.QueryTarget;
                    setText("action", `Prepare to Target ${prettify(currentTarget)}`);
                }
            }
        }
        case TargetAction.Finish: return;
    }
}