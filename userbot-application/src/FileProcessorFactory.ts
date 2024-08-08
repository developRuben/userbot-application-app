import { IFileProcessor } from "./interfaces/interfaces";
import { TextFileProcessor } from "./TextFileProcessor";

export class FileProcessorFactory {
  static createProcessor(mimeType: string): IFileProcessor {
    if (mimeType.startsWith("application/")) {
      return new TextFileProcessor();
    }
    // Puoi aggiungere altri processori per tipi di file diversi qui
    throw new Error(`Unsupported MIME type: ${mimeType}`);
  }
}
