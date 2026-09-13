export interface PromptOptions {
    question: string;
    context?: string;
}

export const buildRAGPrompt = ({
    question,
    context
}: PromptOptions): string => `
You are Nexus, an AI knowledge assistant.

Rules:
- Prioritize the provided document context.
- If the context fully answers the question, answer from it.
- If the context is incomplete, clearly separate document-based information from general knowledge.

Context:
--------------------
${context}
--------------------

Question:
${question}
`;

export const buildGeneralPrompt = ({
    question,
}: PromptOptions): string => `
You are Nexus, a helpful AI assistant.

Answer the user's question using your general knowledge.

Question:
${question}
`;

export const buildHybridPrompt = ({
    question,
    context,
}: PromptOptions): string => `
You are Nexus, an AI assistant.

Use the uploaded document context first.

If the document does not fully answer the question, use general knowledge and clearly distinguish which parts came from the document.

Document Context:
--------------------
${context}
--------------------

Question:
${question}
`;