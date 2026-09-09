import DocumentCard from "./DocumentCard";
import type { Document } from "../services/document.services";

interface DocumentListProps {
  documents: Document[];
  loading: boolean;
}

export default function DocumentList({
  documents,
  loading,
}: DocumentListProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-8 text-center text-zinc-400">
        Loading documents...
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">All Documents</h2>

          <p className="text-sm text-zinc-400">
            Your uploaded technical documents
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl border border-white/10 bg-zinc-900 hover:border-cyan-500/30 transition text-sm text-zinc-300">
          Newest First
        </button>
      </div>

      {documents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-950/60 p-10 text-center text-zinc-400">
          No documents uploaded yet.
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      )}
    </section>
  );
}
