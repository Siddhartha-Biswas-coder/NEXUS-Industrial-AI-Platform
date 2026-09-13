
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Conversation, Message } from "../types/conversation.types";

interface ConversationState {
    conversations: Conversation[];
    activeConversation: Conversation | null;
    messages: Message[];
    loading: boolean;
    loadingHistory: boolean;
    generating: boolean;
    streaming: boolean;
}

const initialState: ConversationState = {
    conversations: [],
    activeConversation: null,
    messages: [],
    loading: false,
    loadingHistory: false,
    generating: false,
    streaming: false,
};

const conversationSlice = createSlice({
    name: "conversation",
    initialState,

    reducers: {
        setConversations(
            state,
            action: PayloadAction<Conversation[]>
        ) {
            state.conversations = action.payload;
        },

        setActiveConversation(
            state,
            action: PayloadAction<Conversation | null>
        ) {
            state.activeConversation = action.payload;
        },

        setMessages(
            state,
            action: PayloadAction<Message[]>
        ) {
            state.messages = action.payload;
        },

        addMessage(
            state,
            action: PayloadAction<Message>
        ) {
            state.messages.push(action.payload);
        },

        setLoading(
            state,
            action: PayloadAction<boolean>
        ) {
            state.loading = action.payload;
        },

        setLoadingHistory(
            state,
            action: PayloadAction<boolean>
        ) {
            state.loadingHistory = action.payload;
        },

        setGenerating(
            state,
            action: PayloadAction<boolean>
        ) {
            state.generating = action.payload;
        },

        updateConversation(state, action: PayloadAction<Conversation>) {
            state.conversations = state.conversations.map((conversation) =>
                conversation._id == action.payload._id
                    ? action.payload
                    : conversation
            )

            if (state.activeConversation?._id == action.payload._id) {
                state.activeConversation = action.payload
            }
        },

        appendToLastAssistantMessage(state, action) {
            const last = state.messages[state.messages.length - 1];

            if (last && last.role === "assistant") {
                last.content += action.payload
            }
        },

        updateLastAssistantMessage(state, action) {
            const last = state.messages[state.messages.length - 1];

            if (last?.role === "assistant") {
                last.sources = action.payload
            }
        },

        setStreaming(state, action: PayloadAction<boolean>) {
            state.streaming = action.payload
        }
    },
});

export const {
    setConversations,
    setActiveConversation,
    setMessages,
    addMessage,
    setLoading,
    setLoadingHistory,
    setGenerating,
    updateConversation,
    appendToLastAssistantMessage,
    updateLastAssistantMessage,
    setStreaming
} = conversationSlice.actions;

export default conversationSlice.reducer;