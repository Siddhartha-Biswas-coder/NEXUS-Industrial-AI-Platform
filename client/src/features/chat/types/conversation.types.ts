export interface MessageSource {
    documentId: string;
    chunkIndex: number;
    score: number;
}

export interface Message {
    _id?: string;
    role: "user" | "assistant";
    content: string;
    createdAt?: string;
    sources?: MessageSource[]
}

export interface Conversation {
    _id: string;
    title: string;
    lastMessageAt: string;
    createdAt: string;
}

export interface MessageSource {
    documentId: string;
    chunkIndex: number;
    score: number;
}

export interface ChatResponse {
    answer: string;
    sources: MessageSource[];
    conversation: Conversation;
}