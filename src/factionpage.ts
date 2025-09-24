import { NSScript } from "../nsdotjs/src/nsdotjs";

// Return the integer value of a specific faction-wide stat.
function parseNukeStat(doc: Document, stat: string): number {
    let element = doc.querySelector(`a.nukestat-${stat}`) as HTMLLinkElement;
    return parseInt(
        (element.childNodes[1].textContent as string).replace(/,/g, "")
    );
}

export type FactionStats = {
    fid: number,
    score: number,
    nations: number,
    nukes: number,
    shields: number,
    shieldbank: number,
    production: number,
    targets: number,
    launches: number,
    intercepts: number,
    strikes: number,
    targeted: number,
    incoming: number,
    radiation: number,
    scrapeTime: number,
};

export async function fetchFactionStats(script: NSScript, fid: number): Promise<FactionStats> {
    let page = await script.getNsHtmlPage(
        `page=faction/fid=${fid}`,
    );

    script.statusBubble.success(
        `Queried N-Day stats for faction ${fid}`
    );

    const parser = new DOMParser();
    var doc = parser.parseFromString(page, "text/html");

    let faction: FactionStats = {
        fid: fid,
        score: parseNukeStat(doc, "score"),
        nations: parseNukeStat(doc, "nations"),
        nukes: parseNukeStat(doc, "nukes"),
        shields: parseNukeStat(doc, "shield"),
        shieldbank: parseNukeStat(doc, "shieldbank"),
        production: parseNukeStat(doc, "production"),
        targets: parseNukeStat(doc, "targets"),
        launches: parseNukeStat(doc, "launches"),
        intercepts: parseNukeStat(doc, "intercepts"),
        strikes: parseNukeStat(doc, "strikes"),
        targeted: parseNukeStat(doc, "targeted"),
        incoming: parseNukeStat(doc, "incoming"),
        radiation: parseNukeStat(doc, "radiation"),
        scrapeTime: Date.now() / 1000,
    };

    return faction;
}

function extractNationFromURL(url: string) {
    let regexResult = /nation=([a-z0-9_\-]+)/.exec(url);
    if (regexResult == null) return undefined;
    return regexResult[1];
}

export async function queryNationsPage(
    script: NSScript, fid: number, start: number
): Promise<Array<[string, boolean]>> {
    let page = await script.getNsHtmlPage(
        `page=faction/fid=${fid}/view=nations`,
        {
            start: start
        }
    );

    script.statusBubble.success(
        `Queried nations list for faction ${fid}`
    );

    const parser = new DOMParser();
    var doc = parser.parseFromString(page, "text/html");

    const tableBody = doc.querySelector("ol");
    return Array.from(tableBody?.children as HTMLCollection).map(element => [
        extractNationFromURL(element.querySelector("a")?.href || "") as string,
        !!element.querySelector("span.nukedestroyedicon")
    ]);
}