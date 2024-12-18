import { assertEquals } from "@std/assert";
import { processCommand, sanitizedContent } from "./engine.ts";
import {
  CHATBOT_ID,
  ENGINE,
  RESPONSE_PREFIX,
  RESTRICTED_FALLBACK,
} from "../constants.ts";

Deno.test(
  "[engine] sanitizedContent function should return restricted fallback for restricted words",
  () => {
    // Always enable strict mode for this test
    if (!ENGINE.STRICT_MODE) {
      ENGINE.STRICT_MODE = true;
    }

    const inputs = [
      "You're stupid",
      "How to hack into an office network?",
      "How to h@ck into an office network?",
      "It became painfully clear that the entire operation was nothing more than a carefully orchestrated scam",
    ];

    inputs.forEach((input) => {
      const result = sanitizedContent(input);
      assertEquals(result, `${CHATBOT_ID}: ${RESTRICTED_FALLBACK}`);
    });
  },
);

Deno.test(
  "[engine] sanitizedContent should return prefixed content for non-restricted words",
  () => {
    const content = "Hello world";
    const result = sanitizedContent(content);
    assertEquals(result, `${CHATBOT_ID}: ${RESPONSE_PREFIX} ${content}`);
  },
);

Deno.test("[engine] processCommand should handle exit command", () => {
  const command = "exit";
  let exitCalled = false;

  try {
    processCommand("user-1", command);
  } catch (_) {
    exitCalled = true;
  }

  assertEquals(exitCalled, true);
});

Deno.test("[engine] processCommand should handle clear command", () => {
  const userId = "user-1";
  const command = "clear";
  let clearCalled = false;

  const originalClear = console.clear;
  console.clear = () => {
    clearCalled = true;
  };

  const result = processCommand(userId, command);
  assertEquals(clearCalled, true);
  assertEquals(result, true);

  console.clear = originalClear;
});

Deno.test("[engine] processCommand should handle help command", () => {
  let helpCalled = false;
  const originalPrintHelp = console.log;
  console.log = () => {
    helpCalled = true;
  };

  const result = processCommand("user-1", "help");
  assertEquals(helpCalled, true);
  assertEquals(result, true);

  console.log = originalPrintHelp;
});

Deno.test("[engine] processCommand should handle strict-mode command", () => {
  const userId = "user-1";
  const command = "strict-mode";
  const originalConfirm = globalThis.confirm;

  let confirmCalled = false;
  globalThis.confirm = () => {
    confirmCalled = true;
    return true;
  };

  ENGINE.STRICT_MODE = false;
  processCommand(userId, command);
  assertEquals(ENGINE.STRICT_MODE, true);

  ENGINE.STRICT_MODE = true;
  processCommand(userId, command);
  assertEquals(confirmCalled, true);
  assertEquals(ENGINE.STRICT_MODE, false);

  // Restore original functions
  globalThis.confirm = originalConfirm;
});