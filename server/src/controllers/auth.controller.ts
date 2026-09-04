import { Request, Response } from "express";
import * as authService from "../services/auth.service.ts";
import asyncHandler from "../middlewares/asyncHandler.ts"
import cookieOptions from "../config/cookie.config.ts";
import { signupSchema } from "../validators/auth.validator.ts";

export const signUpController = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = signupSchema.parse(req.body);

    const result = await authService.signUpService({ name, email, password })

    res.cookie("token", result.token, cookieOptions)

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: result
    })
})