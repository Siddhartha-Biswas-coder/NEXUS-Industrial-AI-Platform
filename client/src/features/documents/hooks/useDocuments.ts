import { useCallback, useEffect, useState } from "react";
import {
    getDocumentsService,
    uploadDocumentService,
    type Document,
} from "../services/document.services";

export const useDocuments = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDocuments = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getDocumentsService();
            setDocuments(data);
        } catch (error) {
            console.error("Failed to fetch documents:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const upload = async (formData: FormData) => {
        const newDocument = await uploadDocumentService(formData);

        setDocuments((prev) => [newDocument, ...prev]);

        return newDocument;
    };

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    return {
        documents,
        loading,
        upload,
        refresh: fetchDocuments,
    };
};