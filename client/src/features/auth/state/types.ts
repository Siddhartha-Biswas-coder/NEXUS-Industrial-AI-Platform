export interface User {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin"
}

export interface LoginData {
    email: string;
    password: string;
}

export interface SignupData {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}