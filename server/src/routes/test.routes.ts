import { Router } from "express";
import {
  testLLMController,
  testRetrievalController,
} from "../controllers/test.controller.ts";
import authMiddleware from "../middlewares/auth.middleware.ts";

const router = Router();

router.get("/test-llm", testLLMController);
router.get("/test-retrieval", authMiddleware, testRetrievalController);

export default router;