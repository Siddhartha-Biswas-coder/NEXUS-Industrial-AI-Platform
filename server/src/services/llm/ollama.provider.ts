import config from "../../config/config.ts";
import type { GenerateOptions, LLMProvider } from "./types.ts";

export class OllamaProvider implements LLMProvider {
  async generate({ prompt }: GenerateOptions): Promise<string> {
    const response = await fetch(`${config.OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: config.LLM_MODEL,
        prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Ollama request failed.");
    }

    const data = await response.json();

    return data.response;
  }
}