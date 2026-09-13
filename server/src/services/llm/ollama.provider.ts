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

  async *streamGenerate({ prompt }: GenerateOptions) {
    const response = await fetch(`${config.OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: config.LLM_MODEL,
        prompt,
        stream: true,
      })
    });

    if (!response.ok || !response.body) {
      throw new Error("Ollama streaming request failed");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");

      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.trim()) continue;

        const data = JSON.parse(line);

        if (data.response) {
          yield data.response
        }
      }
    }

  }
}