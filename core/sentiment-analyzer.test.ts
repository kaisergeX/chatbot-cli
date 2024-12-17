import { assert, assertEquals, assertNotEquals } from "@std/assert";
import { getSentimentScore } from "./sentiment-analyzer.ts";

Deno.test("[getSentimentScore] should return a positive score for positive and neutral content", () => {
  const positiveContent = "I love you!";
  assert(getSentimentScore(positiveContent) > 0);

  const neutralContent = "Roses are red, violets are blue";
  assert(getSentimentScore(neutralContent) > 0);
});

Deno.test("[getSentimentScore] should return a negative score for negative content", () => {
  const negativeContent = "You're stupid";
  const score = getSentimentScore(negativeContent);
  assert(score < 0);
});

Deno.test("[getSentimentScore] should handle empty content", () => {
  const score = getSentimentScore("");
  assertEquals(score, Number.NaN);
});

Deno.test("[getSentimentScore] should handle mixed sentiment content", () => {
  const mixedContent = "You're stupid. I love you!";
  const score = getSentimentScore(mixedContent);
  assertNotEquals(score, 0);
});
