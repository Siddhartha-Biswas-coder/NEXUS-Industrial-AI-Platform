import { FileText, ExternalLink } from "lucide-react";
import type { Source } from "../state/types";

interface SourceCardProps {
  source: Source;
}

export default function SourceCard({ source }: SourceCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-3 hover:border-cyan-500/40 hover:bg-zinc-900/90 transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] flex items-center justify-between gap-3">
      {/* Subtle hover gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-cyan-500/0 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-center gap-3 min-w-0 z-10">
        <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/20 transition-all duration-300 shrink-0">
          <FileText className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
        </div>

        <div className="text-xs min-w-0">
          <div className="text-zinc-200 font-medium truncate group-hover:text-white transition-colors">
            Doc <span className="font-mono text-cyan-300">{source.documentId.slice(0, 8)}</span>
          </div>

          <div className="text-zinc-400 text-[11px] mt-0.5 flex items-center gap-1.5">
            <span>Chunk {source.chunkIndex}</span>
            <span>•</span>
            <span className="text-zinc-400">Score {(source.score * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      <div className="z-10 shrink-0">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-medium group-hover:border-cyan-400/50 transition-colors">
          {(source.score * 100).toFixed(0)}% match
          <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 transition-opacity" />
        </span>
      </div>
    </div>
  );
}