import { Request, Response, NextFunction, response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.ts";
import ApiError from "../errors/ApiError.ts";

export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    }
}

const authMiddelware = (req: AuthRequest , res:Response , next : NextFunction) => {
    const token = req.cookies?.token;

    if(!token){
        return next(new ApiError(401,"Authentication required"))
    }

    try{
        const decoded = jwt.verify(token,config.JWT_SECRET) as {
            id:string;
            role:string;
        }

        req.user = decoded;

        next()
    }catch{
        next(new ApiError(401,"Invalid or expired oken"))
    }
}

export default authMiddelware