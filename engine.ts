import { profanity } from "npm:@2toad/profanity";
import Fuse from "npm:fuse.js";
import {
  CHATBOT_ID,
  RESPONSE_PREFIX,
  RESTRICTED_FALLBACK,
  RESTRICTED_WORDS,
} from "./constants.ts";
import { logging, printHelp } from "./utils.ts";

profanity.addWords(RESTRICTED_WORDS);

// Create a new Fuse instance with the restricted words
const fuse = new Fuse(RESTRICTED_WORDS, {
  minMatchCharLength: 2,
  threshold: 0.3,
});

export function sanitizedContent(content: string): string {
  if (
    profanity.exists(content) ||
    content.split(/\s+/).some((word) => fuse.search(word).length > 0)
  ) {
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
export function processCommand(userId: string, command: string): boolean {
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
