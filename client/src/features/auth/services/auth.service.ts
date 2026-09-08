import api from "../../../shared/lib/axios";

import type { LoginData, SignupData, AuthResponse } from "../state/types";


export const signUpService = async (
    data: SignupData
): Promise<AuthResponse> => {
    const response = await api.post("/auth/sign-up", data);
    return response.data.data;
}

export const loginService = async (
    data: LoginData
): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", data);
    return response.data.data;
}

// export const getCurrentUser = async () => {
//     const response = await api.get("/auth/api");
//     return response.data.data;
// }

export const logoutService = async (): Promise<void> => {
    await api.post("/auth/logout");
}