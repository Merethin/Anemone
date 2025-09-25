/* nukepage.ts - fetch information from page=nukes */

import { NSScript, canonicalize, prettify } from "../nsdotjs/src/nsdotjs";
import { readConfigRecord } from "./config";

export type NukeStats = {
    nation: string,
    nukeType: string,
    isDestroyed: boolean,
    nukes: number,
    shields: number,
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

export function parseNukeStats(doc: Document): NukeStats {
    var header = doc.querySelector("h1.nukeh1");
    var nlink = header?.querySelector("a.nlink");

    const nationName = nlink?.querySelector("span")?.innerText as string;
    const nukeType = (header?.querySelector("span.fancylike") as HTMLSpanElement).innerText;

    const nukes = (doc.querySelector("a.nukestat-nukes") as HTMLLinkElement).innerText;
    const shields = (doc.querySelector("a.nukestat-shield") as HTMLLinkElement).innerText;
    const production = (doc.querySelector("a.nukestat-production") as HTMLLinkElement).innerText;
    const targets = (doc.querySelector("a.nukestat-targets") as HTMLLinkElement).innerText;
    const launches = (doc.querySelector("a.nukestat-launches") as HTMLLinkElement).innerText;
    const intercepts = (doc.querySelector("a.nukestat-intercepts") as HTMLLinkElement).innerText;
    const strikes = (doc.querySelector("a.nukestat-strikes") as HTMLLinkElement).innerText;
    const targeted = (doc.querySelector("a.nukestat-targeted") as HTMLLinkElement).innerText;
    const incoming = (doc.querySelector("a.nukestat-incoming") as HTMLLinkElement).innerText;
    const radiation = (doc.querySelector("a.nukestat-radiation") as HTMLLinkElement).innerText;

    const destroyedText = doc.querySelector(`span.smalltext[style*="color:red"]`);

    return {
        nation: canonicalize(nationName),
        nukeType: nukeType.slice(0, nukeType.indexOf(" Specialist")),
        isDestroyed: !!destroyedText,
        nukes: parseInt(nukes.replace(/,/g, "")),
        shields: parseInt(shields.replace(/,/g, "")),
        production: parseInt(production.replace(/,/g, "")),
        targets: parseInt(targets.replace(/,/g, "")),
        launches: parseInt(launches.replace(/,/g, "")),
        intercepts: parseInt(intercepts.replace(/,/g, "")),
        strikes: parseInt(strikes.replace(/,/g, "")),
        targeted: parseInt(targeted.replace(/,/g, "")),
        incoming: parseInt(incoming.replace(/,/g, "")),
        radiation: parseInt(radiation.replace(/,/g, "")),
        scrapeTime: Date.now(),
    };
}

const PRODUCTION_TICK_INTERVAL = 2 * 60 * 1000; // 2 minutes (in ms)

function productionCap(stats: NukeStats, isWa: boolean): number {
    if (stats.nukeType == "Economic")
        return isWa ? 10000 : 3000;

    return isWa ? 2500 : 750;
}

const RADIATION_PENALTY = 0.66; // new in N-Day13

export function estimateProduction(stats: NukeStats, isWa: boolean): number {
    if(stats.isDestroyed) return 0;

    const timeSinceScrape = Date.now() - stats.scrapeTime;

    const guaranteedTicks = Math.floor(timeSinceScrape / PRODUCTION_TICK_INTERVAL);
    const remainder = timeSinceScrape % PRODUCTION_TICK_INTERVAL;

    let productionRate = isWa ? 150 : 15;

    const productionDecay = (stats.radiation / 100) * RADIATION_PENALTY; // converting percentage to 0-1 range
    productionRate *= (1 - productionDecay);

    let estimatedProd = stats.production + (productionRate * guaranteedTicks);
    if(remainder > (PRODUCTION_TICK_INTERVAL / 2)) 
        estimatedProd += productionRate; // over 50% likelihood of another prod tick

    return Math.min(Math.floor(estimatedProd), productionCap(stats, isWa));
}

export function resourceCost(resource: string, stats: NukeStats): number {
    if (resource == "nuke") {
        if(stats.nukeType == "Military") return 2;
        else return 3;
    } else {
        if(stats.nukeType == "Strategic") return 4;
        else return 6;
    }
}

export function estimatePossibleNukes(stats: NukeStats, isWa: boolean): number {
    const prod = estimateProduction(stats, isWa);
    const cost = resourceCost("nuke", stats);

    return Math.floor(prod/cost);
}

export function estimatePossibleShields(stats: NukeStats, isWa: boolean): number {
    const prod = estimateProduction(stats, isWa);
    const cost = resourceCost("shield", stats);

    return Math.floor(prod/cost);
}

const CLEANUP_COST = 700; // new in N-Day13

export function estimateCleanupCount(stats: NukeStats, isWa: boolean): number {
    const prod = estimateProduction(stats, isWa);

    return Math.floor(prod/CLEANUP_COST);
}

export function saveNukeStats(stats: NukeStats) {
    GM_setValue(`nation:${stats.nation}`, JSON.stringify(stats));
}

export function readNukeStats(nationId: string): NukeStats | null {
    let json = GM_getValue(`nation:${nationId}`, null);
    if(json === null) return null;
    return JSON.parse(json) as NukeStats;
}

export function readNukeStatsAll(): Record<string, NukeStats> {
    let result: Record<string, NukeStats> = {};
    let keys = GM_listValues();

    Array.from(keys).filter(key => key.startsWith("nation:")).forEach(key => {
        const nationStats = JSON.parse(GM_getValue(key)) as NukeStats;
        result[nationStats.nation] = nationStats;
    });

    return result;
}

export function readPuppets(): Array<string> {
    return Object.keys(readConfigRecord("puppets"));
}

export function readNukeStatsPuppets(): Record<string, NukeStats> {
    let stats = readNukeStatsAll();
    let puppetNames = readPuppets();

    return Object.fromEntries(
        Object.entries(stats).filter(([nation, _]) => puppetNames.includes(nation))
    );
}

export async function fetchNukeStats(script: NSScript, nation: string): Promise<NukeStats> {
    let page = await script.getNsHtmlPage(
        `nation=${nation}/page=nukes`,
    );

    script.statusBubble.success(
        `Queried N-Day stats for ${prettify(nation)}`
    );

    const parser = new DOMParser();
	var doc = parser.parseFromString(page, "text/html");

    const stats = parseNukeStats(doc);
    saveNukeStats(stats);

    return stats;
}