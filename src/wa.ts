import { NSScript } from "../nsdotjs/src/nsdotjs";
import { readPuppets } from "./nukepage";

export async function queryWA(script: NSScript) {
    let doc = await script.makeNsAPIXmlRequest({
        wa: 1,
        q: "members"
    });
    console.log(doc);

    let waList = (doc.getElementsByTagName("MEMBERS")[0].childNodes[0].nodeValue as string).split(",");
    let puppetList = readPuppets();

    const overlap = waList.filter(value => puppetList.includes(value));

    if(overlap.length == 0) {
        GM_deleteValue("waNation");
    }

    GM_setValue("waNation", overlap[0]);
}

export function currentWA(): string | null {
    return GM_getValue("waNation", null);
}

export function isWA(nation: string): boolean {
    return currentWA() === nation;
}