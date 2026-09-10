
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Conversation, Message } from "../types/conversation.types";

interface ConversationState {
    conversations: Conversation[];
    activeConversation: Conversation | null;
    messages: Message[];
    loading: boolean;
}

const initialState: ConversationState = {
    conversations: [],
    activeConversation: null,
    messages: [],
    loading: false
}

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

        updateConversation(state, action: PayloadAction<Conversation>) {
            state.conversations = state.conversations.map((conversation) =>
                conversation._id == action.payload._id
                    ? action.payload
                    : conversation
            )

            if (state.activeConversation?._id == action.payload._id) {
                state.activeConversation = action.payload
            }
        }
    },
});

export const {
    setConversations,
    setActiveConversation,
    setMessages,
    addMessage,
    setLoading,
    updateConversation
} = conversationSlice.actions;

export default conversationSlice.reducer;