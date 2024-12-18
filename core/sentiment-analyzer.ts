import Natural from "npm:natural";
import { ENGINE } from "../constants.ts";
const analyzer = new Natural.SentimentAnalyzer(
  "English",
  Natural.PorterStemmer,
  ENGINE.SENTIMENT_ANALYSIS.LEXICON,
);

const wordTokenizer = new Natural.WordTokenizer();

/**
 * Get the sentiment score of the content.
 * - With `afinn` lexicon, the score ranges from -5 (most negative) to 5 (most positive).
 * - With `senticon` lexicon, the score ranges from -1 (most negative) to 1 (most positive).
 * @returns The sentiment score of the content.
 */
export function getSentimentScore(content: string): number {
  return analyzer.getSentiment(wordTokenizer.tokenize(content));
}
