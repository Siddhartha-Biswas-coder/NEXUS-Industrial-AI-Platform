import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.ts";
import { createConversationController, GetConversationsController, GetMessagesController } from "../controllers/conversation.controller.ts";

const router = Router();

router.post("/", authMiddleware, createConversationController);

router.get("/", authMiddleware, GetConversationsController);

router.get("/:id/messages", authMiddleware, GetMessagesController);

export default router;