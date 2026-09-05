import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/ApiError";

const validate =
  (schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(
          new ApiError(
            400,
            error.issues.map((issue) => issue.message).join(", ")
          )
        );
      }
      next(error);
    }
  };

export default validate;