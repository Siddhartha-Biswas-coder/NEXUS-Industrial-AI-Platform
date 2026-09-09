import { useRef, useState } from "react";
import { CheckCircle2, Upload, FileText, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Document } from "../services/document.services";

interface UploadZoneProps {
  upload: (
    file: File,
    title: string,
    onProgress?: (progress: number) => void,
  ) => Promise<Document>;
  refresh: () => Promise<void>;
}

const UploadZone = ({ upload, refresh }: UploadZoneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Onluy PDF file are allowed.");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      await upload(file, file.name.replace(".pdf", ""), setProgress);

      await refresh();
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 1200);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];

        if (file) handleUpload(file);
      }}
      onClick={() => {
        if (!uploading) {
          fileInputRef.current?.click();
        }
      }}
      className={`group relative overflow-hidden rounded-3xl p-10 md:p-14 text-center cursor-pointer transition-all duration-500 backdrop-blur-xl border ${
        isDragging
          ? "border-cyan-400/80 bg-cyan-950/20 shadow-[0_0_60px_rgba(6,182,212,0.25)] scale-[1.01]"
          : "border-zinc-800/80 bg-zinc-950/70 hover:border-cyan-500/40 shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]"
      }`}
    >
      {/* Animated dashed border overlay when dragging */}
      <AnimatePresence>
        {isDragging && (
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 w-full h-full p-px rounded-3xl overflow-hidden z-10"
          >
            <motion.rect
              width="100%"
              height="100%"
              rx="24"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2"
              strokeDasharray="10 8"
              animate={{ strokeDashoffset: [0, -36] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 1.2 }}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Ambient background light gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.12),transparent_70%)] opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-cyan-500/15 blur-[90px] rounded-full group-hover:bg-cyan-500/25 transition-all duration-700" />

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />

      <AnimatePresence mode="wait">
        {uploading ? (
          <motion.div
            key="uploading"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-20 space-y-6 max-w-lg mx-auto py-2"
          >
            {progress === 100 ? (
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 14 }}
                className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-500/40 bg-linear-to-b from-emerald-500/20 to-emerald-500/5 shadow-[0_0_40px_rgba(52,211,153,0.35)]"
              >
                <div className="absolute inset-0 rounded-2xl bg-emerald-400/20 blur-md" />
                <CheckCircle2 className="relative h-10 w-10 text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              </motion.div>
            ) : (
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-500/40 bg-linear-to-b from-cyan-500/25 to-cyan-500/5 shadow-[0_0_35px_rgba(6,182,212,0.3)]"
              >
                <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-md" />
                <Upload className="relative h-10 w-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
              </motion.div>
            )}

            <div className="space-y-1.5">
              <h2 className="text-xl font-semibold tracking-tight text-white">
                {progress === 100 ? "Upload Complete!" : "Uploading PDF..."}
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                {progress === 100
                  ? "Processing document vector embeddings..."
                  : `${progress}% completed`}
              </p>
            </div>

            <div className="w-full max-w-md mx-auto relative bg-zinc-900/90 rounded-full h-3 p-0.5 border border-zinc-800/80 overflow-hidden shadow-inner">
              <motion.div
                className={`h-full rounded-full transition-all ${
                  progress === 100
                    ? "bg-linear-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]"
                    : "bg-linear-to-r from-cyan-500 via-teal-400 to-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.7)]"
                }`}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 70, damping: 16 }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-20 flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut",
              }}
              className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-500/30 bg-linear-to-b from-cyan-500/20 to-cyan-500/5 shadow-[0_0_30px_rgba(6,182,212,0.2)] group-hover:scale-105 group-hover:border-cyan-400/60 group-hover:shadow-[0_0_45px_rgba(6,182,212,0.35)] transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-md group-hover:bg-cyan-400/25 transition-all" />
              <Upload className="relative h-9 w-9 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            </motion.div>

            <h2 className="text-xl font-semibold tracking-tight text-white group-hover:text-cyan-100 transition-colors">
              Upload Technical Documents
            </h2>

            <p className="text-sm text-zinc-400 mt-2 max-w-sm">
              Drag & drop a PDF here, or click below.
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="relative group/btn overflow-hidden mt-6 px-6 py-3 rounded-xl bg-linear-to-r from-cyan-400 via-cyan-300 to-teal-300 text-zinc-950 font-semibold text-sm shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.65)] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-zinc-950 fill-zinc-950" />
                Choose File
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/40 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
            </motion.button>

            <p className="mt-6 text-xs font-medium text-zinc-500 tracking-wider flex items-center gap-1.5 justify-center">
              <FileText className="w-3.5 h-3.5 text-zinc-400" />
              Supported: PDF • Max 20 MB
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadZone;
