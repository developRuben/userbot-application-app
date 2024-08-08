"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const FileProcessorFactory_1 = require("./FileProcessorFactory");
const TextFileProcessor_1 = require("./TextFileProcessor");
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const PORT = 8080;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
}), express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.json({ limit: "50mb" }));
app.post("/upload", (req, res) => {
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
        const processor = FileProcessorFactory_1.FileProcessorFactory.createProcessor(mimeType);
        const result = processor.processFile(base64Data);
        res.send(result);
    }
    catch (error) {
        res.status(500).send(error === null || error === void 0 ? void 0 : error.message);
    }
});
function readFileFromUrl(fileUrl, res) {
    axios_1.default
        .get(fileUrl)
        .then((response) => {
        try {
            const processor = new TextFileProcessor_1.TextFileProcessor();
            const result = processor.analyzeText(response.data);
            res.send(result);
        }
        catch (error) {
            res.status(500).send(error === null || error === void 0 ? void 0 : error.message);
        }
    })
        .catch((error) => {
        res.status(500).send(error === null || error === void 0 ? void 0 : error.message);
    });
}
app.post("/readFromUrl", (req, res) => {
    const { url } = req.body;
    readFileFromUrl(url, res);
});
app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
