import "express";

declare global {
    namespace Express {
        interface UserPayload {
            id: string;
            role: "user" | "admin"
        }

        interface Request {
            user?: UserPayload
        }
    }
}

export { }