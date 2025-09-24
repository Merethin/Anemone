/* keybinds.ts - list of all keybinds and functions to query and set them */
/* ported from latte 0.3.0 */

import { getConfigValue, setConfigValue } from "./config";

/**
 * Stores a keybind's key (name), default value (key) and label (text description).
 */
export type Keybind = {
    key: string;
    defaultValue: string;
    label: string;
}

/**
 * A list of all keybinds in the script, along with their default values.
 */
export const keybinds: Record<string, Keybind> = {
    main: {key: "main", defaultValue: "M", label: "Open Main Page"},
    action: {key: "action", defaultValue: "Enter", label: "Perform Action"},
}

/**
 * Gets the current value of a keybind.
 * 
 * @param keybind The keybind to query.
 * @returns The keybind's configured value, or the default value if not configured.
 */
export function getKeybind(keybind: Keybind): string {
    return getConfigValue<string>(`keybind_${keybind.key}`, keybind.defaultValue);
}

/**
 * Gets the current value of a keybind, but lowercase (for mousetrap).
 * 
 * @param keybind The keybind to query.
 * @returns The keybind's configured value, or the default value if not configured.
 */
export function loadKeybind(keybind: Keybind): string {
    return getKeybind(keybind).toLowerCase();
}

/**
 * Sets a keybind's value.
 * 
 * @param keybind The keybind to update.
 * @param value The value to give that keybind.
 */
export function setKeybind(keybind: Keybind, value: string): void {
    setConfigValue(`keybind_${keybind.key}`, value);
}