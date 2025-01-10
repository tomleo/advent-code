// deno-lint-ignore-file no-explicit-any
export const DEBUG = 10;
export const INFO = 20;
export const WARNING = 30;
export const ERROR = 40;
export const CRITICAL = 50;

type Levels = typeof DEBUG | typeof INFO | typeof WARNING | typeof ERROR | typeof CRITICAL;

export function createLogger(level: Levels) {
    return {
        debug(...msgs: any[]) {
            if (level <= DEBUG) {
                console.log(...msgs);
            }
        },
        info(...msg: any[]) {
            if (level <= INFO) {
                console.log(...msg);
            }
        },
        warning(...msgs: any[]) {
            if (level <= WARNING) {
                console.log(...msgs);
            }
        },
        error(...msgs: any[]) {
            if (level <= ERROR) {
                console.log(...msgs);
            }
        },
        critical(...msgs: any[]) {
            if (level <= CRITICAL) {
                console.log(...msgs);
            }
        }
    }
}
