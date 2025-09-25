/* endpoints.ts - perform N-Day actions */

import { NSScript } from "../nsdotjs/src/nsdotjs";
import { parseNukeStats, saveNukeStats } from "./nukepage";

export async function convertProductionToNukes(script: NSScript, amount: number): Promise<void> {
    let page = await script.getNsHtmlPage(
        `page=nukes/view=production`, {
            convertproduction: `nukes:${amount}`,
        }
    );

    if(page.includes(
        "Arms Control Treaty is now in effect!")
    ) {
        script.statusBubble.warn(
            "Arms Control Treaty in effect"
        );
    } else if(page.includes(
        "Production cannot be generated nor spent."
    )) {
        script.statusBubble.warn(
            "N-Day has not started yet"
        );
    } else {
        script.statusBubble.success(
            `Created ${amount} nukes`
        );
    }

    const parser = new DOMParser();
    var doc = parser.parseFromString(page, "text/html");

    const stats = parseNukeStats(doc);
    saveNukeStats(stats);
}

export async function convertProductionToShields(script: NSScript, amount: number): Promise<void> {
    let page = await script.getNsHtmlPage(
        `page=nukes/view=production`, {
            convertproduction: `shield:${amount}`,
        }
    );

    if(page.includes(
        "Arms Control Treaty is now in effect!")
    ) {
        script.statusBubble.warn(
            "Arms Control Treaty in effect"
        );
    } else if(page.includes(
        "Production cannot be generated nor spent."
    )) {
        script.statusBubble.warn(
            "N-Day has not started yet"
        );
    } else {
        script.statusBubble.success(
            `Created ${amount} shields`
        );
    }

    const parser = new DOMParser();
    var doc = parser.parseFromString(page, "text/html");

    const stats = parseNukeStats(doc);
    saveNukeStats(stats);
}

export async function targetNukesAtNation(script: NSScript, target: string, amount: number): Promise<void> {
    let page = await script.getNsHtmlPage(
        `page=nukes`, {
            target: target,
            nukes: `${amount}`,
        }
    );

    if(page.includes(
        "Arms Control Treaty is now in effect!")
    ) {
        script.statusBubble.warn(
            "Arms Control Treaty in effect"
        );
    } else {
        script.statusBubble.success(
            `Targeted ${amount} nukes at ${target}`
        );
    }

    const parser = new DOMParser();
    var doc = parser.parseFromString(page, "text/html");

    const stats = parseNukeStats(doc);
    saveNukeStats(stats);
}

export async function cleanupNation(script: NSScript, target: string): Promise<void> {
    let page = await script.getNsHtmlPage(
        `page=nukes/view=radiation`, {
            cureradiation: target,
        }
    );

    if(page.includes(
        "Arms Control Treaty is now in effect!")
    ) {
        script.statusBubble.warn(
            "Arms Control Treaty in effect"
        );
    } else {
        script.statusBubble.success(
            `Cleaned up 10 radiation on ${target}`
        );
    }

    const parser = new DOMParser();
    var doc = parser.parseFromString(page, "text/html");

    const stats = parseNukeStats(doc);
    saveNukeStats(stats);
}

export async function donateToShieldBank(script: NSScript, amount: number): Promise<void> {
    let page = await script.getNsHtmlPage(
        `page=nukes/view=shield`, {
            donateshields: `${amount}`,
        }
    );

    if(page.includes(
        "Arms Control Treaty is now in effect!")
    ) {
        script.statusBubble.warn(
            "Arms Control Treaty in effect"
        );
    } else {
        script.statusBubble.success(
            `Donated ${amount} shields to faction shieldbank`
        );
    }

    const parser = new DOMParser();
    var doc = parser.parseFromString(page, "text/html");

    const stats = parseNukeStats(doc);
    saveNukeStats(stats);
}

export async function joinFaction(script: NSScript, fid: number): Promise<void> {
    let page = await script.getNsHtmlPage(
        `page=faction/fid=${fid}`, {
            consider_join_faction: `1`,
            join_faction: `1`,
        }
    );

    if(page.includes(
        "N-Day has now finished.")
    ) {
        script.statusBubble.warn(
            "Arms Control Treaty in effect"
        );
    } else if (page.includes(
        `Very new nations are not permitted to join a Faction.`
    )) {
        script.statusBubble.warn(
            "Nation too young to join faction"
        );
    } else if (page.includes(`You must leave`)) {
        script.statusBubble.warn(
            "Nation already in a faction"
        );
    } else {
        script.statusBubble.success(
            `Joined faction ${fid}`
        );
    }
}