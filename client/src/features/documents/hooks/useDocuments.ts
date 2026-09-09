import { useCallback, useEffect, useRef, useState } from "react";
import {
    getDocumentsService,
    uploadDocumentService,
    type Document,
} from "../services/document.services";

export const useDocuments = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const pollingRef = useRef<number | null>(null);

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

    const upload = async (
        file: File,
        title: string,
        onProgress?: (progress: number) => void
    ) => {
        const newDocument = await uploadDocumentService(file, title, onProgress);

        setDocuments((prev) => [newDocument, ...prev]);

        if (!pollingRef.current) {
            pollingRef.current = window.setInterval(async () => {
                const latest = await getDocumentsService();

                setDocuments(latest);

                const stillProcessing = latest.some(
                    (doc) => doc.status === "uploaded" || doc.status === "processing"
                );

                if (!stillProcessing && pollingRef.current) {
                    clearInterval(pollingRef.current);
                    pollingRef.current = null;
                }
            }, 2000);
        }

        return newDocument;
    };

    useEffect(() => {
        fetchDocuments();

        return () => {
            if (pollingRef.current) {
                clearInterval(pollingRef.current)
            }
        }
    }, [fetchDocuments]);

    return {
        documents,
        loading,
        upload,
        refresh: fetchDocuments,
    };
};