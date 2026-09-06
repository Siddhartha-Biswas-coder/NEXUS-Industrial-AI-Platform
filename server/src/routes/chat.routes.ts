import { Router } from "express";
import { chatController } from "../controllers/chat.controller.ts";
import authMiddleware from "../middlewares/auth.middleware.ts";

const router = Router();

router.post("/", authMiddleware, chatController);

export default router;