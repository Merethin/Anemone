import { getButtonElement, getElement, setText } from '../htmllib';
import { estimateProduction, fetchNukeStats, readNukeStatsPuppets, resourceCost } from '../nukepage';
import Mousetrap from 'mousetrap';
import { keybinds, loadKeybind } from '../keybinds';
import { NSScript, prettify } from '../../nsdotjs/src/nsdotjs';
import { prodHtml } from './html/prod';
import { checkPageRegex, generateRandomNumber } from '../lib';
import { readConfigRecord } from '../config';
import { convertProductionToNukes, convertProductionToShields } from '../endpoints';

let resource = checkPageRegex(/mode=(shield|nuke)/) || "nuke";
let groups = checkPageRegex(/groups=([CESM]+)/) || "";

const puppets = readConfigRecord("puppets");
const puppetStats = Object.entries(readNukeStatsPuppets()).filter(([_, stats]) => {
    if(stats.isDestroyed) return false;
    let type = stats.nukeType.charAt(0);
    return groups.includes(type);
}).map(value => 
    ({value, sort: estimateProduction(value[1], false) + generateRandomNumber(-150, 150)})
).sort(
    (a, b) => b.sort - a.sort
).map(({ value }) => value);

let index = 0;
let currentNation = "";
let resourceAmount = 0;

enum ProdAction {
    Login,
    Query,
    Produce,
    Finish,
}

let prodState = ProdAction.Login;

function updateProgress() {
    setText("progress", `Progress: ${index}/${puppetStats.length}`);

    if(index >= Object.keys(puppetStats).length) setText("action", `Done`);
}

export function setupProdPage() {
    // Insert main HTML
    let container = document.createElement("div");
    container.innerHTML = prodHtml;
    getElement("content").appendChild(container);

    updateProgress();

    getButtonElement("action").onclick = () => {
        Mousetrap.trigger(loadKeybind(keybinds.action));
    };

    return prod;
}

export async function prod(script: NSScript) {
    switch(prodState) {
        case ProdAction.Login: {
            if(index >= puppetStats.length){
                index = puppetStats.length;
                updateProgress();
                prodState = ProdAction.Finish;
                setText("action", "Done");
                return;
            }

            let [nation, _] = puppetStats[index];

            await script.login(nation, puppets[nation]);

            updateProgress();

            index += 1;

            prodState = ProdAction.Query;
            currentNation = nation;
            setText("nation", `Current nation: ${prettify(currentNation)}`);
            setText("action", `Query Production for ${prettify(currentNation)}`);
            return;
        }
        case ProdAction.Query: {
            let newStats = await fetchNukeStats(script, currentNation);

            if(newStats.isDestroyed || newStats.production < resourceCost(resource, newStats)) {
                prodState = ProdAction.Login;
                setText("action", `Login to Next Nation`);
            } else {
                prodState = ProdAction.Produce;
                resourceAmount = Math.floor(newStats.production / resourceCost(resource, newStats));
                setText("action", `Build ${resourceAmount} ${resource}s on ${prettify(currentNation)}`);
            }

            return;
        }
        case ProdAction.Produce: {
            if (resource == "nuke") {
                await convertProductionToNukes(script, resourceAmount);
            } else {
                await convertProductionToShields(script, resourceAmount);
            }

            prodState = ProdAction.Login;
            setText("action", `Login to Next Nation`);
            return;
        }
        case ProdAction.Finish: return;
    }
}