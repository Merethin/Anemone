import { nukeStationHtml } from './html/station';
import { getButtonElement, getElement, getInputElement, setText } from '../htmllib';
import { estimateCleanupCount, estimatePossibleNukes, estimatePossibleShields, estimateProduction, readNukeStats, readNukeStatsPuppets, readPuppets } from '../nukepage';
import { currentWA } from '../wa';
import { prettify } from '../../nsdotjs/src/helpers';

export function updateWAStatus() {
    let wa = currentWA();
    if(wa === null) {
        setText("wa-status", `Current World Assembly nation: none`);
        return;
    }

    let stats = readNukeStats(wa);
    if(stats == null) {
        setText("wa-status", `Current World Assembly nation: ${wa} (unclassified)`);
        return;
    }

    setText("wa-status", `Current World Assembly nation: ${prettify(wa)} (${stats.nukeType} Specialist)`);
}

export function setupNukeStationPage() {
    // Insert main HTML
    let container = document.createElement("div");
    container.innerHTML = nukeStationHtml;
    getElement("content").appendChild(container);

    getButtonElement("mass-join-faction").onclick = () => {
        const fid = getInputElement("mass-join-fid").value;

        window.location.href = `https://${window.location.host}/page=blank/nuke/joinfaction/fid=${fid}`;
    };

    getButtonElement("mass-leave-faction").onclick = () => {
        const fid = getInputElement("mass-leave-fid").value;

        window.location.href = `https://${window.location.host}/page=blank/nuke/leavefaction/fid=${fid}`;
    };

    updateWAStatus();

    const checkboxes = {
        "C": "prod-select-clean",
        "M": "prod-select-mil",
        "E": "prod-select-econ",
        "S": "prod-select-strat",
    };

    getButtonElement("mass-produce-nukes").onclick = () => {
        let groups = ""; 
        Object.entries(checkboxes).forEach(([group, id]) => {
            if(getInputElement(id).checked) groups += group;
        });

        window.location.href = `https://${window.location.host}/page=blank/nuke/prod/mode=nuke/groups=${groups}`;
    };

    getButtonElement("mass-produce-shields").onclick = () => {
        let groups = ""; 
        Object.entries(checkboxes).forEach(([group, id]) => {
            if(getInputElement(id).checked) groups += group;
        });

        window.location.href = `https://${window.location.host}/page=blank/nuke/prod/mode=shield/groups=${groups}`;
    };

    getButtonElement("mass-donate").onclick = () => {
        const ratio = parseInt(getInputElement("mass-donate-ratio").value);

        window.location.href = `https://${window.location.host}/page=blank/nuke/donate/ratio=${ratio}`;
    };

    getButtonElement("mass-target-faction").onclick = () => {
        const fid = parseInt(getInputElement("mass-target-fid").value);
        const overkill = parseFloat(getInputElement("mass-target-overkill").value);

        window.location.href = `https://${window.location.host}/page=blank/nuke/target/fid=${fid}/overkill=${overkill}`;
    };

    getButtonElement("mass-clean-faction").onclick = () => {
        const fid = parseInt(getInputElement("mass-clean-fid").value);

        window.location.href = `https://${window.location.host}/page=blank/nuke/clean/fid=${fid}`;
    };

    let puppets = readPuppets();
    let stats = readNukeStatsPuppets();
    if(Object.keys(stats).length == 0) {
        setText("puppet-status", `${puppets.length} Puppets Saved, 0 Alive / 0 Loaded (run Classify to load)`);
    } else {
        let prod = 0;
        let nukes = 0;
        let shields = 0;
        let destroyed = 0;

        type CategoryData = {
            count: number,
            estimatedProd: number,
            estimatedNukes: number,
            estimatedShield: number,
            estimatedClean: number,
        }

        let categoryTotals: { [category: string] : CategoryData; } = {
            "Cleanup": {count:0, estimatedProd:0, estimatedNukes:0, estimatedShield:0, estimatedClean:0},
            "Military": {count:0, estimatedProd:0, estimatedNukes:0, estimatedShield:0, estimatedClean:0},
            "Economic": {count:0, estimatedProd:0, estimatedNukes:0, estimatedShield:0, estimatedClean:0},
            "Strategic": {count:0, estimatedProd:0, estimatedNukes:0, estimatedShield:0, estimatedClean:0},
        };

        Object.entries(stats).forEach(([_, stats]) => {
            if(stats.isDestroyed) destroyed += 1;
            else {
                prod += stats.production;
                nukes += stats.nukes;
                shields += stats.shields;

                // fixme: check for WA

                categoryTotals[stats.nukeType].count += 1;
                categoryTotals[stats.nukeType].estimatedProd += estimateProduction(stats);
                categoryTotals[stats.nukeType].estimatedNukes += estimatePossibleNukes(stats);
                categoryTotals[stats.nukeType].estimatedShield += estimatePossibleShields(stats);

                if (stats.nukeType === "Cleanup") {
                    categoryTotals[stats.nukeType].estimatedClean += estimateCleanupCount(stats);
                }
            }
        });

        let puppetsLoaded = Object.keys(stats).length;
        let puppetsAlive = puppetsLoaded - destroyed;

        setText("puppet-status", `${puppets.length} Puppets Saved, ${puppetsAlive} Alive / ${puppetsLoaded} Loaded`);

        setText(`prod-confirmed`, prod.toString());
        setText(`nuke-confirmed`, nukes.toString());
        setText(`shield-confirmed`, shields.toString());
        setText(`destroyed-confirmed`, destroyed.toString());

        const categoryElementIds: { [category: string] : string; } = {
            "Cleanup": "clean",
            "Military": "mil",
            "Economic": "econ",
            "Strategic": "strat",
        };

        Object.entries(categoryTotals).forEach(([category, stats]) => {
            let id = categoryElementIds[category];
            setText(`${id}-count`, stats.count.toString());
            setText(`prod-${id}-estimated`, stats.estimatedProd.toString());
            setText(`nuke-${id}-estimated`, stats.estimatedNukes.toString());
            setText(`shield-${id}-estimated`, stats.estimatedShield.toString());

            if (category === "Cleanup") {
                setText(`cure-${id}-estimated`, stats.estimatedClean.toString());
            }
        });
    }
}