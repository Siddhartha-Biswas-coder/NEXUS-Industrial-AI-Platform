import { Request, Response } from "express";
import * as authService from "../services/auth.service.ts";
import asyncHandler from "../middlewares/asyncHandler.ts"
import cookieOptions from "../config/cookie.config.ts";
import ApiResponse from "../utils/ApiResponse.ts";

export const signUpController = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const result = await authService.signUpService({ name, email, password })

    res.cookie("token", result.token, cookieOptions)

    return res.status(201).json(new ApiResponse(201, result, "User created successfully"))
})

export const loginController = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await authService.loginService({ email, password })

    res.cookie("token", result.token, cookieOptions);

    return res.status(200).json(new ApiResponse(200, result, "User logged in successfully"))
})

export const getMeController = asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.getMeService(req.user!.id);

    return res.status(200).json(
        new ApiResponse(200, user, "Current user fetched successfully")
    )
})