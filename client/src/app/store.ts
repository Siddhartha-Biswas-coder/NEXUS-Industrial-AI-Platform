import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/authSlice.ts"

import conversationReducer from "../features/chat/state/conversationSlice.ts"
// import documentReducer from "../features/dashboard/state/documentSlice.ts"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // document: documentReducer,
        conversation: conversationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch