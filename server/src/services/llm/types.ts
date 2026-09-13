export interface GenerateOptions {
    prompt: string
}

export interface LLMProvider {
    generate(options: GenerateOptions): Promise<string>;

    streamGenerate(
        options: GenerateOptions
    ): AsyncGenerator<string, void, unknown>
}