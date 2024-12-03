export function getRandomUserId(): string {
  return `user-${Math.floor(Math.random() * 100)}`;
}

export function printHelp() {
  console.log(`\nCommands:
    - exit, quit, :q  Exit the program
    - clear, cls      Clear the chat history
    - help, :h        Show this help
    `);
}
