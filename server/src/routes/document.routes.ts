import { Router } from "express";
import authMiddelware from "../middlewares/auth.middleware.ts";
import upload from "../config/multer.config.ts";
import { uploadDocumentController } from "../controllers/document.controller.ts";

const router = Router();

router.post("/upload", authMiddelware, upload.single("file"), uploadDocumentController)

export default router
