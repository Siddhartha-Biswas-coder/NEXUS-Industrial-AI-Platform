import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.ts";
import { createConversationController, deleteConversationController, getConversationsController, getMessagesController, updateConversationActiveDocumentsController, updateConversationTitleController } from "../controllers/conversation.controller.ts";

const router = Router();

router.post("/", authMiddleware, createConversationController);

router.get("/", authMiddleware, getConversationsController);

router.get("/:conversationId/messages", authMiddleware, getMessagesController);

router.patch("/:conversationId", authMiddleware, updateConversationTitleController)

router.patch("/:conversationId/active-documents", authMiddleware, updateConversationActiveDocumentsController)

router.delete("/:conversationId", authMiddleware, deleteConversationController)

export default router;