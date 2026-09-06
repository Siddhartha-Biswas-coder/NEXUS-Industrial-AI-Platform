import fs from "fs/promises";
import { PDFParse } from "pdf-parse";

export const extractPdfText = async (filePath: string) => {
    const buffer = await fs.readFile(filePath);

    const parser = new PDFParse({ data: buffer });

    try {
        const textResult = await parser.getText();
        const infoResult = await parser.getInfo();

        await parser.destroy();

        return {
            text: textResult.text,
            pages: textResult.total,
            metadata: infoResult.info,
        };
    } finally {
        await parser.destroy()
    }
}