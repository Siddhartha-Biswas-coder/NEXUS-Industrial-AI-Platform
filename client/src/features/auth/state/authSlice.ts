import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../types";

interface AuthState {
    user: User | null,
    isAuthenticated: boolean,
    loading: boolean,
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },

        loginSuccess(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },

        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
        },

    },
})

export const { setLoading, loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;