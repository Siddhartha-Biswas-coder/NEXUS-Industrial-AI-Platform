import React from "react";
import { FileText } from "lucide-react";

export const DocumentsHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-4 select-none">
      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-lg shadow-cyan-500/10">
        <FileText className="w-6 h-6 text-cyan-400" />
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Documents</h1>
        <p className="text-sm text-zinc-400 mt-0.5">
          Upload and manage your AI knowledge base.
        </p>
      </div>
    </div>
  );
};

export default DocumentsHeader;
