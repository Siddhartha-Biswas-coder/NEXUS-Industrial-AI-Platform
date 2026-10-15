
import config from "../../config/config.ts";
import type { GenerateOptions, LLMProvider } from "./types.ts";

const REQUEST_TIMEOUT_MS = 120_000;

interface OllamaGenerateResponse {
  response?: unknown;
  error?: unknown;
}

export class OllamaProvider implements LLMProvider {
  private get endpoint(): string {
    return `${config.OLLAMA_URL.replace(/\/+$/, "")}/api/generate`;
  }

  private createRequestSignal(signal?: AbortSignal): AbortSignal {
    const timeoutSignal = AbortSignal.timeout(REQUEST_TIMEOUT_MS);

    return signal
      ? AbortSignal.any([signal, timeoutSignal])
      : timeoutSignal;
  }

  private async post(
    prompt: string,
    stream: boolean,
    signal: AbortSignal,
  ): Promise<Response> {
    let response: Response;

    try {
      response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: config.LLM_MODEL,
          prompt,
          stream,
        }),
        signal,
      });
    } catch (error) {
      if (signal.aborted) {
        throw new Error("Ollama request timed out or was cancelled.", {
          cause: error,
        });
      }

      throw new Error(
        "Could not connect to Ollama. Check that its local server is running.",
        { cause: error },
      );
    }

    if (!response.ok) {
      const details = await response.text().catch(() => "");
      throw new Error(
        `Ollama returned HTTP ${response.status}: ${details.slice(0, 500) || response.statusText
        }`,
      );
    }

    return response;
  }

  async generate({ prompt, signal }: GenerateOptions): Promise<string> {
    const requestSignal = this.createRequestSignal(signal);
    const response = await this.post(prompt, false, requestSignal);

    let data: OllamaGenerateResponse;

    try {
      data = (await response.json()) as OllamaGenerateResponse;
    } catch (error) {
      throw new Error("Ollama returned invalid JSON.", { cause: error });
    }

    if (typeof data.error === "string" && data.error) {
      throw new Error(`Ollama generation failed: ${data.error}`);
    }

    if (typeof data.response !== "string") {
      throw new Error("Ollama returned no valid generated response.");
    }

    return data.response;
  }

  async *streamGenerate({ prompt, signal }: GenerateOptions): AsyncGenerator<string, void, unknown> {
    const requestSignal = this.createRequestSignal(signal);
    const response = await this.post(prompt, true, requestSignal);

    if (!response.body) {
      throw new Error("Ollama returned an empty response stream.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let streamCompleted = false;

    const processLine = (line: string): string | undefined => {
      if (!line.trim()) return undefined;

      let data: OllamaGenerateResponse;

      try {
        data = JSON.parse(line) as OllamaGenerateResponse;
      } catch (error) {
        throw new Error("Ollama returned malformed streaming JSON.", {
          cause: error,
        });
      }

      if (typeof data.error === "string" && data.error) {
        throw new Error(`Ollama streaming failed: ${data.error}`);
      }

      if (data.response !== undefined) {
        if (typeof data.response !== "string") {
          throw new Error("Ollama returned an invalid stream chunk.");
        }

        return data.response;
      }

      return undefined;
    };

    try {
      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          streamCompleted = true;
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const chunk = processLine(line);

          if (chunk !== undefined && chunk.length > 0) {
            yield chunk;
          }
        }
      }

      buffer += decoder.decode();

      if (buffer.trim()) {
        const chunk = processLine(buffer);

        if (chunk !== undefined && chunk.length > 0) {
          yield chunk;
        }
      }
    } finally {
      if (!streamCompleted) {
        await reader.cancel().catch(() => undefined);
      }

      reader.releaseLock();
    }
  }
}
