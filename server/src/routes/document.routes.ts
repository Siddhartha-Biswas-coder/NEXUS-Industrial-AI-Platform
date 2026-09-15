import { Router } from "express";
import authMiddelware from "../middlewares/auth.middleware.ts";
import upload from "../config/multer.config.ts";
import { uploadDocumentController, getDocumentsController } from "../controllers/document.controller.ts";
import { documentFileController } from "../controllers/documentFile.controller.ts";

const router = Router();

router.post("/upload", authMiddelware, upload.single("file"), uploadDocumentController)

router.get("/", authMiddelware, getDocumentsController)

router.get("/:documentId/file", authMiddelware, documentFileController)

export default router
