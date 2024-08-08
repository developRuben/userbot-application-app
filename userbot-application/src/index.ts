import express, { Request, Response } from "express";
import cors from "cors";
import { FileProcessorFactory } from "./FileProcessorFactory";
import { TextFileProcessor } from "./TextFileProcessor";

import https = require("https");
import http = require("http");
import axios from "axios";

const app = express();
const PORT = 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  }),
  express.json({ limit: "50mb" })
);

app.use(express.json({ limit: "50mb" }));

app.post("/upload", (req: Request, res: Response) => {
  const { file } = req.body;

  if (!file) {
    return res.status(400).send("Nessun file inviato.");
  }

  const matches = file.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return res.status(400).send("Formato Base64 non valido.");
  }

  const mimeType = matches[1];

  const base64Data = matches[2];

  try {
    const processor = FileProcessorFactory.createProcessor(mimeType);
    const result = processor.processFile(base64Data);

    res.send(result);
  } catch (error: any) {
    res.status(500).send(error?.message);
  }
});

function readFileFromUrl(fileUrl: string, res: Response) {
  axios
    .get(fileUrl)
    .then((response) => {
      try {
        const processor = new TextFileProcessor();
        const result = processor.analyzeText(response.data);
        res.send(result);
      } catch (error: any) {
        res.status(500).send(error?.message);
      }
    })
    .catch((error: any) => {
      res.status(500).send(error?.message);
    });
}

app.post("/readFromUrl", (req: Request, res: Response) => {
  const { url } = req.body;
  readFileFromUrl(url, res);
});

app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
