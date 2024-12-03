import { profanity } from "npm:@2toad/profanity";
import Fuse from "npm:fuse.js";
import {
  CHATBOT_ID,
  RESPONSE_PREFIX,
  RESTRICTED_FALLBACK,
  RESTRICTED_WORDS,
} from "./constants.ts";
import { getRandomUserId, logging, printHelp } from "./utils.ts";

let userId = "";

// Create a new Fuse instance with the restricted words
const fuse = new Fuse(RESTRICTED_WORDS, {
  minMatchCharLength: 2,
});

export function sanitizedContent(content: string): string {
  if (profanity.exists(content) || fuse.search(content).length) {
    return `${CHATBOT_ID}: ${RESTRICTED_FALLBACK}`;
  }

  return `${CHATBOT_ID}: ${RESPONSE_PREFIX} ${content}`;
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
      logging({ userId, message: "exit", botResponse: "Goodbye!" });
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
  userId = getRandomUserId();

  // profanity.addWords(RESTRICTED_WORDS);
  printHelp();

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
    console.log("\n", filteredContent, "\n\n---------------------");
    logging({ userId, message: userInput, botResponse: filteredContent });
  }
}
