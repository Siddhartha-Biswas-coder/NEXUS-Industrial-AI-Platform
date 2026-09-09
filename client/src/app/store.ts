import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/authSlice.ts"
import chatReducer from "../features/chat/state/chatSlice.ts"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch