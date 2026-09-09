import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Message } from "./types";

interface ChatSate {
    messages: Message[];
    loading: boolean
}

const initialState: ChatSate = {
    messages: [],
    loading: false
}

const chatSlice = createSlice({
    name: "chat",
    initialState,

    reducers: {
        addMessage(state, action: PayloadAction<Message>) {
            state.messages.push(action.payload)
        },

        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

        clearChat(state) {
            state.messages = []
        }
    }
})

export const {
    addMessage,
    setLoading,
    clearChat
} = chatSlice.actions;


export default chatSlice.reducer;