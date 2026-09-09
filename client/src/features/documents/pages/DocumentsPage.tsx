import UploadZone from "../components/UploadZone";
import DocumentList from "../components/DocumentList.tsx";
import { FileText } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-[#090a0f] text-white px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <FileText className="w-6 h-6 text-cyan-400" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Documents</h1>
            <p className="text-zinc-400">
              Upload and manage your AI knowledge base.
            </p>
          </div>
        </div>

        <UploadZone />

        <DocumentList />
      </div>
    </div>
  );
}