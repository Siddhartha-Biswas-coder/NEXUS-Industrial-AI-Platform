import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import ApiError from "../errors/ApiError.ts";
import config from "../config/config.ts";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    const statusCode = err instanceof ApiError ? err.statusCode : 500;

    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: err.message || "Internal Server Error",
        ...(config.NODE_ENV == "development" && { stack: err.stack })
    })
}

export default errorHandler;