export interface GenerateOptions {
    prompt: string;
    signal?: AbortSignal;
}

export interface LLMProvider {
    generate(options: GenerateOptions): Promise<string>;

    streamGenerate(
        options: GenerateOptions
    ): AsyncGenerator<string, void, unknown>
}