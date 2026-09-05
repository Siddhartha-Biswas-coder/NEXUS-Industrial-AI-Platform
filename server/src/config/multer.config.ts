import multer from "multer";
import path from "path";
import fs from "fs";
import ApiError from "../errors/ApiError.ts";

const uploadDir = path.join(process.cwd(), "uploads");

//Create uploads folder automatically
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir)
    },

    filename: (_req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);

        cb(null, uniqueName);
    }
})

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const isPdfMime = file.mimetype === "application/pdf";
  const isPdfExtension =
    path.extname(file.originalname).toLowerCase() === ".pdf";

  if (isPdfMime || isPdfExtension) {
    return cb(null, true);
  }

  cb(new ApiError(400, "Only PDF files are allowed"));
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
})

export default upload;