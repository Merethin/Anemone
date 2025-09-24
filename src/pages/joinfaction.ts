import { getButtonElement, getElement, setText } from '../htmllib';
import Mousetrap from 'mousetrap';
import { keybinds, loadKeybind } from '../keybinds';
import { NSScript, prettify } from '../../nsdotjs/src/nsdotjs';
import { joinFactionHtml } from './html/joinfaction';
import { checkPageRegex } from '../lib';
import { readConfigRecord } from '../config';
import { joinFaction } from '../endpoints';

let targetFid = parseInt(checkPageRegex(/fid=([0-9]+)/) || "0");

const puppets = readConfigRecord("puppets");
const puppetCount = Object.keys(puppets).length;

let index = 0;
let currentNation = "";

enum JoinAction {
    Login,
    Join,
    Finish,
}

let joinState = JoinAction.Login;

function updateProgress() {
    setText("progress", `Progress: ${index}/${puppetCount}`);

    if(index >= Object.keys(puppets).length) setText("action", `Done`);
}

export function setupJoinFactionPage() {
    // Insert main HTML
    let container = document.createElement("div");
    container.innerHTML = joinFactionHtml;
    getElement("content").appendChild(container);

    updateProgress();

    getButtonElement("action").onclick = () => {
        Mousetrap.trigger(loadKeybind(keybinds.action));
    };

    return joinfaction;
}

export async function joinfaction(script: NSScript) {
    switch(joinState) {
        case JoinAction.Login: {
            if(index >= puppetCount){
                index = puppetCount;
                updateProgress();
                joinState = JoinAction.Finish;
                setText("action", "Done");
                return;
            }

            let [nation, password] = Object.entries(puppets)[index];

            await script.login(nation, password);

            updateProgress();

            index += 1;

            joinState = JoinAction.Join;
            currentNation = nation;
            setText("nation", `Current nation: ${prettify(currentNation)}`);
            setText("action", `Join Faction ${targetFid} on ${prettify(currentNation)}`);
            return;
        }
        case JoinAction.Join: {
            await joinFaction(script, targetFid);

            joinState = JoinAction.Login;
            setText("action", `Login to Next Nation`);
            return;
        }
        case JoinAction.Finish: return;
    }
}