import { profanity } from "npm:@2toad/profanity";
import Fuse from "npm:fuse.js";
import {
  CHATBOT_ID,
  ENGINE,
  RESPONSE_PREFIX,
  RESTRICTED_FALLBACK,
  RESTRICTED_WORDS,
} from "./constants.ts";
import { logging, printHelp } from "./utils.ts";

profanity.addWords(RESTRICTED_WORDS);

// Create a new Fuse instance with the restricted words
const fuse = new Fuse(RESTRICTED_WORDS, {
  minMatchCharLength: 2,
  threshold: 0.5,
});

export function sanitizedContent(content: string): string {
  if (profanity.exists(content)) {
    return `${CHATBOT_ID}: ${RESTRICTED_FALLBACK}`;
  }

  if (
    ENGINE.STRICT_MODE &&
    (fuse.search(content).length ||
      content.split(/\s+/).some((word) => fuse.search(word).length > 0))
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
    case "strict-mode":
    case ":sm": {
      if (ENGINE.STRICT_MODE) {
        const turnedOffStrictMode = confirm(
          "Are you sure you want to disable strict mode?",
        );

        if (turnedOffStrictMode) {
          ENGINE.STRICT_MODE = false;
          console.log(
            "\x1b[41m\x1b[37m%s\x1b[0m",
            "Strict mode is turned off!",
          );
        }
      } else {
        ENGINE.STRICT_MODE = true;
        console.log("\x1b[42m\x1b[37m%s\x1b[0m", "Strict mode is turned on!");
      }
      break;
    }
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
