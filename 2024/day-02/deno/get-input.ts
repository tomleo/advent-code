import * as path from "jsr:@std/path";

export type Level = number;
export type Report = Level[];

export async function getRawInput() {
    const current = Deno.cwd();
    const p = path.join(current, "../", "input.txt");
    const text = await Deno.readTextFileSync(p);
    return text;
}

export function processInput(rawText: string) {
    const inputLines: Report[] = rawText.split('\n').map(i => i.split(' ')).map(i => i.map(Number));
    return inputLines;
}
