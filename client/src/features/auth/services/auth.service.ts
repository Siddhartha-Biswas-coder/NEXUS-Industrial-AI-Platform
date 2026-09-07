import api from "../../../shared/lib/axios";

import type { LoginPayload, SignupPayload } from "../types";

export const login = async (payload: LoginPayload) => {
    const response = await api.post("/auth/login", payload);
    return response.data;
}

export const signUp = async (payload: SignupPayload) => {
    const response = await api.post("/auth/signup", payload);
    return response.data;
}

export const getCurrentUser = async () => {
    const response = await api.get("/auth/api");
    return response.data;
}

export const logout = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
}