/* lib.ts - utility functions that do not primarily use the DOM (the others go in htmllib.ts). */
/* semi-ported from latte 0.3.0 */

/**
 * Checks if the current page we're on contains a string.
 * 
 * @param page The string to check.
 * @returns True if it does contain the string, False if it doesn't.
 */
export function checkPage(page: string): boolean {
    return window.location.href.includes(page);
}

/**
 * Checks if the current page we're on matches a specific regex.
 * This function is intended to be used on a regex with a single capture group.
 * 
 * @param regex The regex to match against.
 * @returns The value of the matched regex's first capture group, or null if the page doesn't match.
 */
export function checkPageRegex(regex: RegExp): string | null {
    let result = regex.exec(window.location.href);
    if (result == null) return null;
    return result[1];
}

export function generateRandomNumber(start: number, end: number): number {
    return (Math.random() * (end-start)) + start;
}