export interface IFileProcessor {
  processFile(base64Data: string): IAnalysisResults;
  analyzeText(text: string): IAnalysisResults;
}

export interface IAnalysisResults {
  totalWords: number;
  totalLetters: number;
  totalSpaces: number;
  frequentWords: IFrequentWords[];
}

export interface IFrequentWords {
  word: string;
  count: number;
}
