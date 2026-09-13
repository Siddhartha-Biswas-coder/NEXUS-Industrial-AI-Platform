import { Router } from "express";
import { signUpController, loginController, getMeController } from "../controllers/auth.controller";
import validate from "../middlewares/validate.middleware.ts";
import { loginSchema, signupSchema } from "../validators/auth.validator.ts";
import authMiddleware from "../middlewares/auth.middleware.ts";

const router = Router();

router.post("/sign-up", validate(signupSchema), signUpController);

router.post("/login", validate(loginSchema), loginController)

router.get("/me", authMiddleware, getMeController)

export default router