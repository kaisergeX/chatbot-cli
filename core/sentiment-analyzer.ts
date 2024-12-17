import Natural from "npm:natural";
import { ENGINE } from "../constants.ts";
const analyzer = new Natural.SentimentAnalyzer(
  "English",
  Natural.PorterStemmer,
  ENGINE.SENTIMENT_ANALYSIS.LEXICON,
);

const wordTokenizer = new Natural.WordTokenizer();

export function getSentimentScore(content: string): number {
  return analyzer.getSentiment(wordTokenizer.tokenize(content));
}
