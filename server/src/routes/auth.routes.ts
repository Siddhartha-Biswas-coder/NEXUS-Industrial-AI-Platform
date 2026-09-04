import { Router } from "express";
import { signUpController } from "../controllers/auth.controller";

const router = Router();

router.post("/sign-up", signUpController);

export default router