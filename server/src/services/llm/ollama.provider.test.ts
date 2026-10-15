
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../../config/config.ts", () => ({
  default: {
    OLLAMA_URL: "http://127.0.0.1:11434",
    LLM_MODEL: "llama3.2:3b",
  },
}));

import { OllamaProvider } from "./ollama.provider.ts";

describe("OllamaProvider cancellation", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("passes the caller's abort signal to the HTTP request", async () => {
    let receivedSignal: AbortSignal | undefined;

    vi.stubGlobal(
      "fetch",
      vi.fn((_url: string, options?: RequestInit) => {
        receivedSignal = options?.signal as AbortSignal;

        return new Promise<Response>((_resolve, reject) => {
          receivedSignal?.addEventListener(
            "abort",
            () => reject(new DOMException("Aborted", "AbortError")),
            { once: true },
          );
        });
      }),
    );

    const provider = new OllamaProvider();
    const controller = new AbortController();

    const generation = provider.generate({
      prompt: "Test prompt",
      signal: controller.signal,
    });

    await vi.waitFor(() => {
      expect(receivedSignal).toBeDefined();
    });

    expect(receivedSignal?.aborted).toBe(false);

    controller.abort();

    await expect(generation).rejects.toThrow(
      "Ollama request timed out or was cancelled.",
    );

    expect(receivedSignal?.aborted).toBe(true);
  });

  it("aborts the streaming HTTP request when the caller cancels", async () => {
    let receivedSignal: AbortSignal | undefined;

    vi.stubGlobal(
      "fetch",
      vi.fn((_url: string, options?: RequestInit) => {
        receivedSignal = options?.signal as AbortSignal;

        return new Promise<Response>((_resolve, reject) => {
          receivedSignal?.addEventListener(
            "abort",
            () => reject(new DOMException("Aborted", "AbortError")),
            { once: true },
          );
        });
      }),
    );

    const provider = new OllamaProvider();
    const controller = new AbortController();
    const stream = provider.streamGenerate({
      prompt: "Test prompt",
      signal: controller.signal,
    });

    const firstRead = stream.next();

    await vi.waitFor(() => {
      expect(receivedSignal).toBeDefined();
    });

    controller.abort();

    await expect(firstRead).rejects.toThrow(
      "Ollama request timed out or was cancelled.",
    );

    expect(receivedSignal?.aborted).toBe(true);
  });

  it("returns a generated response when the request succeeds", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({ response: "Hello from Ollama" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        ),
      ),
    );

    const provider = new OllamaProvider();

    await expect(
      provider.generate({ prompt: "Say hello" }),
    ).resolves.toBe("Hello from Ollama");
  });
});

