import { ENGINE, RESTRICTED_WORDS } from "./constants.ts";
import { processCommand, sanitizedContent } from "./engine.ts";
import { getRandomUserId, logging, printHelp } from "./utils.ts";

function greeting() {
  if (ENGINE.STRICT_MODE) {
    console.log("\x1b[42m\x1b[37m%s\x1b[0m", "strict mode");
  } else {
    console.log("\x1b[43m\x1b[37m%s\x1b[0m", "strict mode is off");
  }

  console.log("\nWelcome to SafeChat!\n---------------------");
}

function main() {
  console.log("Restricted words:", RESTRICTED_WORDS);

  greeting();
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
