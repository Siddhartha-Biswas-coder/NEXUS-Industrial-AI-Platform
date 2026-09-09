import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";

interface AuthState {
    user: User | null,
    isAuthenticated: boolean,
    loading: boolean,
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: true,
}

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        loginSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },

        logoutSuccess: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
        },

    },
})

export const { setLoading, loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;