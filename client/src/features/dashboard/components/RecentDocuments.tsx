import {
  FileText,
  ChevronRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

import { useDocuments } from "../../documents/hooks/useDocuments";

export default function RecentDocuments() {
  const navigate = useNavigate();
  const { documents, loading } = useDocuments();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -15 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-4"
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Recent Documents</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </h2>

          <p className="text-xs text-zinc-400">
            Recently indexed RAG knowledge base files
          </p>
        </div>

        <motion.button
          onClick={() => navigate("/documents")}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group cursor-pointer bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-xl"
        >
          <span>View all</span>
          <ChevronRight
            size={14}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </motion.button>
      </div>

      {/* Loading State */}

      {loading && (
        <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-8 text-center text-zinc-400 backdrop-blur-xl">
          Loading documents...
        </div>
      )}

      {/* Empty State */}

      {!loading && documents.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-950/60 p-8 text-center backdrop-blur-xl">
          <FileText className="mx-auto w-10 h-10 text-zinc-500 mb-3" />

          <h3 className="text-white font-semibold">No documents yet</h3>

          <p className="text-sm text-zinc-400 mt-1">
            Upload your first technical document to begin building your AI
            knowledge base.
          </p>
        </div>
      )}

      {/* Real Documents */}

      {!loading && documents.length > 0 && (
        <div className="space-y-3">
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              variants={itemVariants}
              whileHover={{ x: 4, scale: 1.005 }}
              onClick={() => navigate("/documents")}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/60 p-4 backdrop-blur-xl hover:border-cyan-500/30 hover:bg-zinc-900/60 shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative shrink-0 w-11 h-11 rounded-xl bg-linear-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center group-hover:scale-105 group-hover:border-cyan-400/50 transition-all duration-300 shadow-sm">
                  <FileText className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-sm text-white truncate group-hover:text-cyan-300 transition-colors">
                    {doc.title}
                  </p>

                  <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-400 font-medium">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />

                      <span>
                        Uploaded{" "}
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <span className="text-zinc-700">•</span>

                    <span>
                      {(doc.fileSize / (1024 * 1024)).toFixed(1)} MB
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4 shrink-0">
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400 shadow-sm shadow-emerald-500/10 capitalize">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />

                  <span>{doc.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
}