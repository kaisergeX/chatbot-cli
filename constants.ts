import "@std/dotenv/load";
export const LOG_FILE = "chatbot_log.txt";

export const ENGINE = {
  STRICT_MODE: Deno.env.get("ENGINE_STRICT_MODE") === "off" ? false : true,
};

export const RESTRICTED_WORDS = Deno.env.get("RESTRICTED_WORDS")?.split(",") ||
  [];

export const RESTRICTED_FALLBACK =
  "I'm sorry, but I can't assist with that request.";
export const CHATBOT_ID = "Chatbot";
export const RESPONSE_PREFIX = "I hear you say:";
