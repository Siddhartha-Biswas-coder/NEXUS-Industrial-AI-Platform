import DocumentsHeader from "../components/DocumentsHeader";
import UploadSection from "../components/UploadSection";
import DocumentSection from "../components/DocumentSection";
import { useDocuments } from "../hooks/useDocuments";

export default function DocumentsPage() {
  const documentsHook = useDocuments();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <DocumentsHeader />
      <UploadSection {...documentsHook} />
      <DocumentSection {...documentsHook} />
    </div>
  );
}
