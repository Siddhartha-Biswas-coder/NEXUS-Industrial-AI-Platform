import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.ts";
import { createConversationController, GetConversationsController } from "../controllers/conversation.controller.ts";

const router = Router();

router.post("/", authMiddleware, createConversationController);

router.get("/", authMiddleware, GetConversationsController);

export default router;