import { processCommand, sanitizedContent } from "./engine.ts";
import { getRandomUserId, printHelp, logging } from "./utils.ts";

function main() {
  console.log("Welcome to SafeChat!\n---------------------");
  printHelp();

  const userId = getRandomUserId();

  while (true) {
    console.log("\nUser ID:", userId);
    const input = prompt("Message:");

    if (input === null) {
      console.log("This device is NOT supported");
      Deno.exit(0);
    }

    const userInput = input.trim();
    if (processCommand(userId, userInput)) {
      continue;
    }

    const filteredContent = sanitizedContent(userInput);
    console.log(`\n${filteredContent}`, "\n\n---------------------");
    logging({ userId, message: userInput, botResponse: filteredContent });
  }
}

// Only run if the current module is the program entry point: https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  main();
}
