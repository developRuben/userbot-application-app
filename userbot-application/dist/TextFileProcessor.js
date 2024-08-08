"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFileProcessor = void 0;
class TextFileProcessor {
    processFile(base64Data) {
        const buffer = Buffer.from(base64Data, "base64");
        return this.analyzeText(buffer.toString("utf-8")); // Restituisce il contenuto del file come stringa di testo
    }
    analyzeText(text) {
        const words = text.match(/\b\w+\b/g) || [];
        const letters = text.match(/[a-zA-Z]/g) || [];
        const spaces = text.match(/\s/g) || [];
        const wordOccurrences = this.getWordOccurrences(text);
        const frequentWords = Object.entries(wordOccurrences)
            .filter(([word, count]) => count > 10)
            .map(([word, count]) => ({ word, count }));
        return {
            totalWords: words.length,
            totalLetters: letters.length,
            totalSpaces: spaces.length,
            frequentWords: frequentWords,
        };
    }
    getWordOccurrences(text) {
        const words = text.toLowerCase().match(/\b\w+\b/g);
        const wordCount = {};
        (words || []).forEach((word) => {
            console.log("word", word);
            wordCount[word] = (wordCount[word] || 0) + 1;
        });
        console.log("wordCount", wordCount);
        return wordCount;
    }
}
exports.TextFileProcessor = TextFileProcessor;
