import { profanity } from "npm:@2toad/profanity";
import Fuse from "npm:fuse.js";
import {
  RESPONSE_PREFIX,
  RESTRICTED_FALLBACK,
  RESTRICTED_WORDS,
} from "./constants.ts";
import { getRandomUserId, printHelp } from "./utils.ts";

// Create a new Fuse instance with the restricted words
const fuse = new Fuse(RESTRICTED_WORDS, {
  minMatchCharLength: 2,
});

function sanitizedContent(content: string): string {
  if (fuse.search(content).length || profanity.exists(content)) {
    return RESTRICTED_FALLBACK;
  }

  return `${RESPONSE_PREFIX} ${content}`;
}

/**
 * Process the program commands
 *
 * @param command input command
 * @returns true if the command is processed, false otherwise
 */
function processCommand(command: string): boolean {
  switch (command) {
    case "exit":
    case "quit":
    case ":q": {
      console.log("Goodbye!");
      Deno.exit(0);
      break;
    }

    case "clear":
    case "cls": {
      console.clear();
      break;
    }

    case "help":
    case ":h": {
      printHelp();
      break;
    }

    default:
      return false;
  }

  return true;
}

export function runChatEngine() {
  profanity.addWords(RESTRICTED_WORDS);
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
    if (processCommand(userInput)) {
      continue;
    }

    const filteredContent = sanitizedContent(userInput);
    console.log("\nChatbot:", filteredContent, "\n\n---------------------");
  }
}
