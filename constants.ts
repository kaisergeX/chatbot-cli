import "@std/dotenv/load";
export const LOG_FILE = "chatbot_log.txt";

const ENV_ENGINE = {
  STRICT_MODE: Deno.env.get("ENGINE_STRICT_MODE") !== "off",
  PROMT: Object.freeze({
    /** Rate limit for the chatbot. Falsy value means no rate limit (eg: `NaN` and `0`). */
    RATE_LIMIT: parseInt(Deno.env.get("PROMT_RATE_LIMIT") || "5"),
    /**
     * Rate limit period in milliseconds. This is the time window for the rate limit.
     * Will be ignored if `RATE_LIMIT` is falsy.
     */
    RATE_LIMIT_PERIOD: parseInt(
      Deno.env.get("PROMT_RATE_LIMIT_PERIOD") || "30000", // 30 seconds
    ),
  }),
};

export const ENGINE = Object.defineProperty(ENV_ENGINE, "PROMT", { // only make PROMT read-only
  writable: false, // read-only
  configurable: false,
  enumerable: true,
});

export const RESTRICTED_WORDS = Deno.env.get("RESTRICTED_WORDS")?.split(",") ||
  [];

export const RESTRICTED_FALLBACK =
  "I'm sorry, but I can't assist with that request.";
export const CHATBOT_ID = "Chatbot";
export const RESPONSE_PREFIX = "I hear you say:";
