import { useEffect, useState, useMemo } from "react";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Check, X, Search, Layers, CheckSquare, Square, Loader2 } from "lucide-react";
import {
  getDocumentsService,
  type Document,
} from "@/features/documents/services/document.services";

interface DocumentItem extends Document {
  pageCount?: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  selected: string[] | null;
  onSave: (documentIds: string[]) => Promise<void>;
}

export default function DocumentSelector({
  open,
  onClose,
  selected,
  onSave,
}: Props) {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>(selected ?? []);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    setSearchQuery("");

    const loadDocuments = async () => {
      try {
        setLoadingDocs(true);
        const data = await getDocumentsService();
        const docs = data || [];
        setDocuments(docs);
        setSelectedIds(selected ?? []);
      } catch (error) {
        console.error("Failed to load documents:", error);
      } finally {
        setLoadingDocs(false);
      }
    };

    loadDocuments();
  }, [open, selected]);

  const filteredDocuments = useMemo(() => {
    if (!searchQuery.trim()) return documents;
    return documents.filter((doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  }, [documents, searchQuery]);

  const toggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === documents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(documents.map((d) => d._id));
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await onSave(selectedIds);
      onClose();
    } catch (error) {
      console.error("Failed to save selection:", error);
    } finally {
      setSaving(false);
    }
  };

  const allSelected = documents.length > 0 && selectedIds.length === documents.length;

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onClose={onClose} className="relative z-50">
          {/* Backdrop Blur */}
          <motion.div
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.95,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: 16,
                scale: 0.97,
                filter: "blur(8px)",
              }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 30,
              }}
              className="w-full max-w-2xl my-auto"
            >
              <Dialog.Panel className="w-full rounded-3xl border border-zinc-800/80 bg-zinc-950/95 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="flex items-start justify-between p-6 pb-4 border-b border-zinc-800/80 bg-linear-to-r from-cyan-950/20 via-zinc-950 to-zinc-950">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.15)] shrink-0">
                      <Layers className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <Dialog.Title className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
                        Active Knowledge Sources
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                          {selectedIds.length} active
                        </span>
                      </Dialog.Title>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                        Choose which documents the AI can reference for RAG semantic search.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    type="button"
                    className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors shrink-0 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Toolbar / Search */}
                <div className="px-6 py-3.5 border-b border-zinc-800/60 bg-zinc-900/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-zinc-900/90 border border-zinc-800 text-sm text-zinc-200 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {documents.length > 0 && (
                    <button
                      onClick={handleSelectAll}
                      type="button"
                      className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800/80 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0"
                    >
                      {allSelected ? (
                        <>
                          <CheckSquare className="w-4 h-4 text-cyan-400" />
                          <span>Deselect All</span>
                        </>
                      ) : (
                        <>
                          <Square className="w-4 h-4 text-zinc-400" />
                          <span>Select All ({documents.length})</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Document List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-3 min-h-55">
                  {loadingDocs ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3 text-zinc-400">
                      <Loader2 className="w-7 h-7 text-cyan-400 animate-spin" />
                      <p className="text-xs">Loading available knowledge documents...</p>
                    </div>
                  ) : filteredDocuments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3">
                        <FileText className="w-6 h-6 text-zinc-500" />
                      </div>
                      <p className="text-sm font-medium text-zinc-300">
                        {searchQuery ? "No matching documents found" : "No documents uploaded yet"}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1 max-w-sm">
                        {searchQuery
                          ? "Try changing your search term."
                          : "Upload PDFs in the Documents tab to make them available for AI search."}
                      </p>
                    </div>
                  ) : (
                    filteredDocuments.map((doc, index) => {
                      const checked = selectedIds.includes(doc._id);

                      return (
                        <motion.div
                          key={doc._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03, duration: 0.2 }}
                        >
                          <button
                            type="button"
                            onClick={() => toggle(doc._id)}
                            className={`w-full text-left flex items-center justify-between rounded-2xl border p-4 transition-all duration-200 group cursor-pointer ${
                              checked
                                ? "border-cyan-500/50 bg-linear-to-r from-cyan-950/30 via-zinc-900/90 to-zinc-900 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                                : "border-zinc-800/80 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900"
                            }`}
                          >
                            <div className="flex items-center gap-4 min-w-0 pr-3">
                              <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                  checked
                                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                    : "bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 group-hover:text-zinc-200"
                                }`}
                              >
                                <FileText className="w-5 h-5" />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="font-semibold text-sm text-white group-hover:text-cyan-200 transition-colors truncate">
                                  {doc.title}
                                </div>

                                <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                                  {doc.pageCount && (
                                    <span>{doc.pageCount} pages</span>
                                  )}
                                  {doc.pageCount && <span>•</span>}
                                  <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[10px] font-medium text-zinc-300">
                                    {doc.status ?? "Indexed"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div
                              className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all duration-200 shrink-0 ${
                                checked
                                  ? "bg-cyan-500 border-cyan-400 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)] scale-105"
                                  : "border-zinc-700 bg-zinc-800/50 group-hover:border-zinc-500"
                              }`}
                            >
                              {checked && <Check className="w-4 h-4 stroke-3" />}
                            </div>
                          </button>
                        </motion.div>
                      );
                    })
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800/80 bg-zinc-950">
                  <div className="text-xs text-zinc-400">
                    <span className="font-semibold text-cyan-400">
                      {selectedIds.length}
                    </span>{" "}
                    of {documents.length} selected
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2.5 rounded-xl border border-zinc-800 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className="px-6 py-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-teal-400 text-black font-semibold text-sm hover:from-cyan-400 hover:to-teal-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50 cursor-pointer flex items-center gap-2"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>Save Selection</span>
                      )}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

