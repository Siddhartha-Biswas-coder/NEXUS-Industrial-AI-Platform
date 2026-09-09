import { FileText, Clock, CheckCircle2 } from "lucide-react";
import type { Document } from "../services/document.services";

interface DocumentCardProps {
  document: Document;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  const statusStyles = {
    uploaded: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    processing: "bg-yellow-500/15 border-yellow-500/30 text-yellow-400",
    indexed: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    failed: "bg-red-500/15 border-red-500/30 text-red-400",
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/60 p-4 backdrop-blur-xl hover:border-cyan-500/30 transition-all">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <FileText className="w-5 h-5 text-cyan-400" />
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-white truncate">
            {document.title}
          </h3>

          <div className="flex items-center gap-4 text-sm text-zinc-400 mt-1">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              {new Date(document.createdAt).toLocaleDateString()}
            </div>

            <div>{(document.fileSize / (1024 * 1024)).toFixed(1)} MB</div>
          </div>
        </div>
      </div>

      <div
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusStyles[document.status]}`}
      >
        <CheckCircle2 className="w-3.5 h-3.5" />

        {document.status}
      </div>
    </div>
  );
}
