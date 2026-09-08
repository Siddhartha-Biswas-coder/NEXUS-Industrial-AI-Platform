import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.ts";
import ApiError from "../errors/ApiError.ts";

const authMiddelware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        return next(new ApiError(401, "Authentication required"))
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET) as Express.UserPayload

        req.user = {
            id: decoded.id,
            role: decoded.role,
        };

        next()
    } catch {
        next(new ApiError(401, "Invalid or expired oken"))
    }
}

export default authMiddelware