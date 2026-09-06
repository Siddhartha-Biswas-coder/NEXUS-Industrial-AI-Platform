import config from "../../config/config.ts";
import { OllamaProvider } from "./ollama.provider.ts";
import type { LLMProvider } from "./types.ts";

export const llm: LLMProvider = (() => {
  switch (config.LLM_PROVIDER) {
    case "ollama":
    default:
      return new OllamaProvider();
  }
})();