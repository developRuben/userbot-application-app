"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileProcessorFactory = void 0;
const TextFileProcessor_1 = require("./TextFileProcessor");
class FileProcessorFactory {
    static createProcessor(mimeType) {
        if (mimeType.startsWith("application/")) {
            return new TextFileProcessor_1.TextFileProcessor();
        }
        // Puoi aggiungere altri processori per tipi di file diversi qui
        throw new Error(`Unsupported MIME type: ${mimeType}`);
    }
}
exports.FileProcessorFactory = FileProcessorFactory;
