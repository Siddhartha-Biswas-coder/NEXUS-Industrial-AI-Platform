import { Router } from "express";
import { signUpController,loginController } from "../controllers/auth.controller";
import validate from "../middlewares/validate.middleware.ts";
import { loginSchema,signupSchema } from "../validators/auth.validator.ts";

const router = Router();

router.post("/sign-up",validate(signupSchema), signUpController);

router.post("/login",validate(loginSchema),loginController)

export default router