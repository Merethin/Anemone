import { classifyHtml } from './html/classify';
import { getButtonElement, getElement, setText } from '../htmllib';
import { fetchNukeStats, readPuppets } from '../nukepage';
import Mousetrap from 'mousetrap';
import { keybinds, loadKeybind } from '../keybinds';
import { NSScript, prettify } from '../../nsdotjs/src/nsdotjs';

const puppets = readPuppets();
let index = 0;

function updateProgress() {
    setText("progress", `Progress: ${index}/${puppets.length}`);

    if(index >= puppets.length) setText("action", `Done`);
    setText("action", `Query ${prettify(puppets[index])}`);
}

export function setupClassifyPage() {
    // Insert main HTML
    let container = document.createElement("div");
    container.innerHTML = classifyHtml;
    getElement("content").appendChild(container);

    updateProgress();

    getButtonElement("action").onclick = () => {
        Mousetrap.trigger(loadKeybind(keybinds.action));
    };

    return classify;
}

export async function classify(script: NSScript) {
    if(index >= puppets.length) return;

    const puppet = puppets[index];

    await fetchNukeStats(script, puppet);

    index += 1;
    
    updateProgress();
}