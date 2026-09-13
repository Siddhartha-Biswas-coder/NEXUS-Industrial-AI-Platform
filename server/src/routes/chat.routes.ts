import { Router } from "express";
import { chatController } from "../controllers/chat.controller.ts";
import authMiddleware from "../middlewares/auth.middleware.ts";
import { streamChatController } from "../controllers/chatStream.controller.ts";

const router = Router();

router.post("/", authMiddleware, chatController);
router.post("/stream", authMiddleware, streamChatController);

export default router;