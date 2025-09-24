import { configHtml } from './html/config';
import { getButtonElement, getElement, getInputElement } from '../htmllib';
import { saveConfigRecord, setConfigValue } from '../config';
import { canonicalize } from '../../nsdotjs/src/nsdotjs';

export function setupConfigPage() {
    // Insert main HTML
    let container = document.createElement("div");
    container.innerHTML = configHtml;
    getElement("content").appendChild(container);

    getButtonElement("save-settings").onclick = () => {
        const userAgent = getInputElement("user-agent").value;

        const puppets: Record<string, string> = {};
        const puppetList = getInputElement("puppet-list").value;

        const defaultPassword = getInputElement("default-password").value;

        puppetList.split("\n").forEach((puppet) => {
            if (puppet.includes(",")) {
                let [nation, password] = puppet.split(",", 2);
                puppets[canonicalize(nation)] = password;
            } else {
                puppets[canonicalize(puppet)] = defaultPassword;
            }
        });

        setConfigValue("userAgent", userAgent);
        saveConfigRecord("puppets", puppets);

        window.location.href = `https://${window.location.host}/page=blank/nuke/station`;
    };
}