import { LOG_FILE } from "./constants.ts";

export function getRandomUserId(): string {
  return `user-${(Math.random() * 1000) | 0}`;
}

export function printHelp() {
  console.log(`\nCommands:
    - strict-mode, :sm  Toggle the strict mode
    - exit, quit, :q    Exit the program
    - clear, cls        Clear the chat history
    - help, :h          Show this help
    `);
}

type Logging = {
  userId: string;
  message: string;
  botResponse: string;
  timestamp?: string;
};

export function logging({
  userId,
  message,
  botResponse,
  timestamp,
}: Logging) {
  const logTimestamp = timestamp || new Date().toISOString();
  const logMessage =
    `[${logTimestamp}] ${userId}: ${message}\n[${logTimestamp}] Bot: ${botResponse}\n`;
  Deno.writeTextFileSync(LOG_FILE, logMessage, { append: true });
}

// function fuzzyRegex(word: string) {
//   const replacements: Record<string, string> = {
//     "@": "[aA]",
//     $: "[sS]",
//     "0": "[oO]",
//     "1": "[iI|lL]",
//     "3": "[eE]",
//     "5": "[sS]",
//     "8": "[bB]",
//     "!": "[iI]",
//     "|": "[iI]",
//   };

//   return word
//     .split("")
//     .map((char) => replacements[char] || char)
//     .join("");
// }

// // fuzzy matching regex
// export function isFuzzyMatchRestrictedWord(input: string): boolean {
//   const processInput = fuzzyRegex(input);

//   return RESTRICTED_WORDS.some((word) =>
//     new RegExp(word, "i").test(processInput)
//   );
// }
