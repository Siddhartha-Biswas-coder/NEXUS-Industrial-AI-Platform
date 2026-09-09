import api from "../../../shared/lib/axios";

export interface Document {
    id: string;
    title: string;
    originalName: string;
    fileSize: number;
    status: "uploaded" | "processing" | "indexed";
    createdAt: string;
}

export const getDocumentsService = async (): Promise<Document[]> => {
    const response = await api.get("/documents");

    return response.data.data
}

export const uploadDocumentService = async (
    formData: FormData,
): Promise<Document> => {
    const response = await api.post("/documents/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data.data
}