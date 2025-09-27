import { getButtonElement, getElement, setText } from '../htmllib';
import { fetchNukeStats, readNukeStatsPuppets, updateNukeStats } from '../nukepage';
import Mousetrap from 'mousetrap';
import { keybinds, loadKeybind } from '../keybinds';
import { NSScript, prettify } from '../../nsdotjs/src/nsdotjs';
import { donateHtml } from './html/donate';
import { checkPageRegex, generateRandomNumber } from '../lib';
import { readConfigRecord } from '../config';
import { donateToShieldBank } from '../endpoints';

let ratio = Math.min(parseInt(checkPageRegex(/ratio=([0-9]+)/) || "50"), 100) / 100;

const puppets = readConfigRecord("puppets");
const puppetStats = Object.entries(readNukeStatsPuppets()).filter(([_, stats]) => {
    if(stats.isDestroyed) return false;
    return stats.shields > 0;
}).map(value => ({value, sort: value[1].shields + generateRandomNumber(-25, 25)})).sort(
    (a, b) => b.sort - a.sort
).map(({ value }) => value);

console.log(puppetStats);

let index = 0;
let currentNation = "";
let shieldAmount = 0;
let remainingShields = 0;

enum DonateAction {
    Login,
    Query,
    Donate,
    Finish,
}

let donateState = DonateAction.Login;

function updateProgress() {
    setText("progress", `Progress: ${index}/${puppetStats.length}`);

    if(index >= Object.keys(puppetStats).length) setText("action", `Done`);
}

export function setupDonatePage() {
    // Insert main HTML
    let container = document.createElement("div");
    container.innerHTML = donateHtml;
    getElement("content").appendChild(container);

    updateProgress();

    getButtonElement("action").onclick = () => {
        Mousetrap.trigger(loadKeybind(keybinds.action));
    };

    return donate;
}

export async function donate(script: NSScript) {
    switch(donateState) {
        case DonateAction.Login: {
            if(index >= puppetStats.length){
                index = puppetStats.length;
                updateProgress();
                donateState = DonateAction.Finish;
                setText("action", "Done");
                return;
            }

            let [nation, _] = puppetStats[index];

            await script.login(nation, puppets[nation]);

            updateProgress();

            index += 1;

            donateState = DonateAction.Query;
            currentNation = nation;
            setText("nation", `Current nation: ${prettify(currentNation)}`);
            setText("action", `Query Shields for ${prettify(currentNation)}`);
            return;
        }
        case DonateAction.Query: {
            let newStats = await fetchNukeStats(script, currentNation);
            shieldAmount = Math.floor(newStats.shields * ratio);
            remainingShields = newStats.shields - shieldAmount;

            if(newStats.isDestroyed || shieldAmount == 0) {
                donateState = DonateAction.Login;
                setText("action", `Login to Next Nation`);
            } else {
                donateState = DonateAction.Donate;
                setText("action", `Donate ${shieldAmount} shields to shieldbank`);
            }

            return;
        }
        case DonateAction.Donate: {
            await donateToShieldBank(script, shieldAmount);

            updateNukeStats(currentNation, {
                shields: remainingShields, 
            });

            donateState = DonateAction.Login;
            setText("action", `Login to Next Nation`);
            return;
        }
        case DonateAction.Finish: return;
    }
}