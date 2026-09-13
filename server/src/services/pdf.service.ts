import fs from "fs/promises";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractPdfText = async (filePath: string) => {
  const buffer = await fs.readFile(filePath);

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
  });

  const pdf = await loadingTask.promise;

  const pageTexts: string[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();

    const text = textContent.items
      .map((item: any) => ("str" in item ? item.str : ""))
      .join(" ")
      .trim();

    pageTexts.push(text);
  }

  return {
    text: pageTexts.join("\n\n"),
    pages: pdf.numPages,
    pageTexts,
    metadata: {},
  };
};