import DocumentModel from "../models/document.model.ts";

interface UploadData {
    title: string;
    file: Express.Multer.File;
    userId: string;
}

export const uploadDocumentService = async ({ title, file, userId }: UploadData) => {
    const document = await DocumentModel.create({
        title,
        originalName: file.originalname,
        filePath: file.path,
        fileSize: file.size,
        mimeType: file.mimetype,
        owner: userId,
        status: "uploaded"
    })

    return document;

}