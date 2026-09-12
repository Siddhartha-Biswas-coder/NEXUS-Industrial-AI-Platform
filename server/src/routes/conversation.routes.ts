import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.ts";
import { createConversationController, GetConversationsController, GetMessagesController, updateConversationTitleController } from "../controllers/conversation.controller.ts";

const router = Router();

router.post("/", authMiddleware, createConversationController);

router.get("/", authMiddleware, GetConversationsController);

router.get("/:conversationId/messages", authMiddleware, GetMessagesController);

router.patch("/:conversationId", authMiddleware, updateConversationTitleController)

export default router;