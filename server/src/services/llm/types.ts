export interface GenerateOptions {
    prompt: string
}

export interface LLMProvider {
    generate(options: GenerateOptions): Promise<string>
}