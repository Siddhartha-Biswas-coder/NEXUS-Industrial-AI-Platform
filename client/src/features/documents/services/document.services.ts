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
    file: File,
    title: string,
    onProgress?: (progress: number) => void
): Promise<Document> => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("title", title);


    const response = await api.post("/documents/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },

        onUploadProgress: (event) => {
            if (!event.total) return;

            const progress = Math.round((event.loaded * 100) / event.total);

            onProgress?.(progress)
        }
    })

    return response.data.data
}