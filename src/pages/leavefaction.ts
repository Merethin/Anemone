import { getButtonElement, getElement, setText } from '../htmllib';
import Mousetrap from 'mousetrap';
import { keybinds, loadKeybind } from '../keybinds';
import { NSScript, prettify } from '../../nsdotjs/src/nsdotjs';
import { leaveFactionHtml } from './html/leavefaction';
import { checkPageRegex } from '../lib';
import { readConfigRecord } from '../config';
import { leaveFaction } from '../endpoints';
import { updateNukeStats } from '../nukepage';

let targetFid = parseInt(checkPageRegex(/fid=([0-9]+)/) || "0");

const puppets = readConfigRecord("puppets");
const puppetCount = Object.keys(puppets).length;

let index = 0;
let currentNation = "";

enum LeaveAction {
    Login,
    Leave,
    Finish,
}

let leaveState = LeaveAction.Login;

function updateProgress() {
    setText("progress", `Progress: ${index}/${puppetCount}`);

    if(index >= Object.keys(puppets).length) setText("action", `Done`);
}

export function setupLeaveFactionPage() {
    // Insert main HTML
    let container = document.createElement("div");
    container.innerHTML = leaveFactionHtml;
    getElement("content").appendChild(container);

    updateProgress();

    getButtonElement("action").onclick = () => {
        Mousetrap.trigger(loadKeybind(keybinds.action));
    };

    return leavefaction;
}

export async function leavefaction(script: NSScript) {
    switch(leaveState) {
        case LeaveAction.Login: {
            if(index >= puppetCount){
                index = puppetCount;
                updateProgress();
                leaveState = LeaveAction.Finish;
                setText("action", "Done");
                return;
            }

            let [nation, password] = Object.entries(puppets)[index];

            await script.login(nation, password);

            updateProgress();

            index += 1;

            leaveState = LeaveAction.Leave;
            currentNation = nation;
            setText("nation", `Current nation: ${prettify(currentNation)}`);
            setText("action", `Leave Faction ${targetFid} on ${prettify(currentNation)}`);
            return;
        }
        case LeaveAction.Leave: {
            await leaveFaction(script, targetFid);

            updateNukeStats(currentNation, {
                production: 0,
            });

            leaveState = LeaveAction.Login;
            setText("action", `Login to Next Nation`);
            return;
        }
        case LeaveAction.Finish: return;
    }
}