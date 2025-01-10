import * as logging from "jsr:@tomleo/logging";

export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
    console.log("Add 2 + 3 =", add(2, 3));
    const logger = logging.createLogger(logging.DEBUG)
    logger.debug("Hello World");
}
