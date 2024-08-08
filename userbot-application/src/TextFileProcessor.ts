import {
  IAnalysisResults,
  IFileProcessor,
  IFrequentWords,
} from "./interfaces/interfaces";

export class TextFileProcessor implements IFileProcessor {
  processFile(base64Data: string): IAnalysisResults {
    const buffer = Buffer.from(base64Data, "base64");
    return this.analyzeText(buffer.toString("utf-8")); // Restituisce il contenuto del file come stringa di testo
  }
  public analyzeText(text: string): IAnalysisResults {
    const words = text.match(/\b\w+\b/g) || [];
    const letters = text.match(/[a-zA-Z]/g) || [];
    const spaces = text.match(/\s/g) || [];
    const wordOccurrences = this.getWordOccurrences(text);

    const frequentWords: IFrequentWords[] = Object.entries(wordOccurrences)
      .filter(([word, count]) => count > 10)
      .map(([word, count]) => ({ word, count }));

    return {
      totalWords: words.length,
      totalLetters: letters.length,
      totalSpaces: spaces.length,
      frequentWords: frequentWords,
    };
  }

  getWordOccurrences(text: string) {
    const words = text.toLowerCase().match(/\b\w+\b/g);
    const wordCount: { [key: string]: number } = {};

    ((words as string[]) || []).forEach((word) => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    return wordCount;
  }
}
