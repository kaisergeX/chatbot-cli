import { assertEquals } from "@std/assert";
import { getRandomUserId, logging } from "./utils.ts";

Deno.test("[utils] logging function should write correct log message", () => {
  // Arrange
  const userId = getRandomUserId();
  const message = "Hello",
    botResponse = message;
  const timestamp = new Date().toISOString();
  const expectedLogMessage = `[${timestamp}] ${userId}: ${message}\n[${timestamp}] Bot: ${botResponse}\n`;

  let writtenLogMessage = "";
  const originalWriteTextFileSync = Deno.writeTextFileSync;

  // Mock Deno.writeTextFileSync
  Deno.writeTextFileSync = (_, logMessage) => {
    writtenLogMessage = logMessage;
  };

  logging({ userId, message, botResponse, timestamp });

  assertEquals(writtenLogMessage, expectedLogMessage);

  // Restore original function
  Deno.writeTextFileSync = originalWriteTextFileSync;
});
