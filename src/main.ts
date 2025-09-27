/* main.ts - main script file */

import Mousetrap from 'mousetrap';
import { NSScript } from '../nsdotjs/src/nsdotjs';
import { readConfigValue } from './config';
import { keybinds, loadKeybind } from './keybinds';
import { checkPage } from './lib';
import { injectUserAgentWarning } from './htmllib';
import { VERSION } from '../build/version';
import { setupNukeStationPage, updateWAStatus } from './pages/station';
import { setupConfigPage } from './pages/config';
import { setupClassifyPage } from './pages/classify';
import { setupProdPage } from './pages/prod';
import { setupJoinFactionPage } from './pages/joinfaction';
import { setupDonatePage } from './pages/donate';
import { setupTargetPage } from './pages/target';
import { setupCleanupPage } from './pages/cleanup';
import { setupLeaveFactionPage } from './pages/leavefaction';
import { queryWA } from './wa';

const SCRIPT_NAME = "Anemone";
const AUTHOR = "Merethin";

(async function() {
    'use strict';

    let action = async (_: NSScript) => {};

    if (checkPage("page=blank/nuke/station")) {
        setupNukeStationPage();
    } else if (checkPage("page=blank/nuke/config")) {
        setupConfigPage();
    } else if (checkPage("page=blank/nuke/classify")) {
        action = setupClassifyPage();
    } else if (checkPage("page=blank/nuke/prod")) {
        action = setupProdPage();
    } else if (checkPage("page=blank/nuke/joinfaction")) {
        action = setupJoinFactionPage();
    } else if (checkPage("page=blank/nuke/leavefaction")) {
        action = setupLeaveFactionPage();
    } else if (checkPage("page=blank/nuke/donate")) {
        action = setupDonatePage();
    } else if (checkPage("page=blank/nuke/target")) {
        action = setupTargetPage();
    } else if (checkPage("page=blank/nuke/clean")) {
        action = setupCleanupPage();
    }

    let userAgent = readConfigValue<string>("userAgent");
    if(userAgent == null) {
        if(!checkPage("page=blank/nuke/config")) {
            injectUserAgentWarning(); 
        }
    } else {
        // Only load the NSScript and keybinds if we have a user agent
        let script = new NSScript(SCRIPT_NAME, VERSION, AUTHOR, userAgent, async () => {});

        Mousetrap.bind(loadKeybind(keybinds.main), (_) => {
            if(script.isHtmlRequestInProgress) return;
                
            window.location.href = `https://${window.location.host}/page=blank/nuke/station`;
        }, 'keyup');

        Mousetrap.bind(loadKeybind(keybinds.action), (_) => {
            if(script.isHtmlRequestInProgress) return;
                
            if(action !== undefined) action(script);
        }, 'keyup');

        Mousetrap.bind('w', (_) => {
            let f = async () => {
                if (checkPage("page=blank/nuke/station")) {
                    await queryWA(script);
                    updateWAStatus();
                }
            }
            f();
        }, 'keyup');
    }
})();