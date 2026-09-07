export interface User {
    id : string;
    name : string;
    email : string;
    role : string;
}

export interface LoginPayload {
    email : string;
    password : string;
}

export interface SignupPayload {
    name : string;
    email : string;
    password : string;
}