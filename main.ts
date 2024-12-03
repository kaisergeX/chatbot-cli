import { runChatEngine } from "./engines.ts";

function main() {
  console.log("Welcome to SafeChat!\n---------------------");
  runChatEngine();
}

// Only run if the current module is the program entry point: https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  main();
}
