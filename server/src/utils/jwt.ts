import jwt from "jsonwebtoken";
import { config } from "../config/config.ts";

export const generateToken = (userId: string, role: string) => {
    return jwt.sign(
        { id: userId, role },
        config.JWT_SECRET,
        { expiresIn: config.JWT_ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"] }
    )
}