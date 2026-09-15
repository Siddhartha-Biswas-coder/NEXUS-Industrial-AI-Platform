import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import {
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";

import api from "@/shared/lib/axios";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface Props {
  open: boolean;
  onClose: () => void;
  documentId: string;
  pageNumber: number;
}

export default function PdfViewerModal({
  open,
  onClose,
  documentId,
  pageNumber,
}: Props) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [scale, setScale] = useState(1.2);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  // Store last valid documentId so content remains during exit animation
  const [activeDocumentId, setActiveDocumentId] = useState(documentId);

  useEffect(() => {
    if (documentId) {
      setActiveDocumentId(documentId);
    }
  }, [documentId]);

  useEffect(() => {
    setCurrentPage(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    if (!open || !activeDocumentId) return;

    let objectUrl: string | null = null;

    const loadPdf = async () => {
      setLoadingPdf(true);
      setPdfError(false);

      try {
        const response = await api.get(`/documents/${activeDocumentId}/file`, {
          responseType: "blob",
        });

        objectUrl = URL.createObjectURL(response.data);
        setPdfUrl(objectUrl);
      } catch (error) {
        console.error("Failed to load PDF:", error);
        setPdfError(true);
      } finally {
        setLoadingPdf(false);
      }
    };

    loadPdf();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      setPdfUrl(null);
      setNumPages(0);
    };
  }, [activeDocumentId, open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;

        case "ArrowLeft":
        case "k":
        case "p":
          setCurrentPage((p) => Math.max(1, p - 1));
          break;

        case "ArrowRight":
        case "j":
        case "n":
          setCurrentPage((p) => Math.min(numPages || p, p + 1));
          break;

        case "+":
        case "=":
          setScale((s) => Math.min(3, s + 0.2));
          break;

        case "-":
        case "_":
          setScale((s) => Math.max(0.8, s - 0.2));
          break;

        case "0":
          setScale(1.2);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, numPages, onClose]);

  const shouldReduceMotion = useReducedMotion();

  // Fast & Snappy macOS / Arc Floating Glass Sheet Motion Variants
  const glassSheetVariants: Variants = {
    initial: {
      opacity: 0,
      y: 35,
      scale: 0.97,
      scaleY: 0.92,
      filter: "blur(8px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      scaleY: [0.92, 1.02, 1],
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 380,
        damping: 28,
        mass: 0.7,
        scaleY: {
          times: [0, 0.45, 1],
          duration: 0.34,
          ease: "easeOut",
        },
        filter: {
          duration: 0.22,
          ease: "easeOut",
        },
        opacity: {
          duration: 0.18,
          ease: "easeOut",
        },
      },
    },
    exit: {
      opacity: 0,
      y: 25,
      scale: 0.985,
      scaleY: 0.94,
      filter: "blur(6px)",
      transition: {
        duration: 0.22,
        ease: [0.32, 0, 0.67, 0],
      },
    },
  };

  const reducedMotionVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.15 } },
    exit: { opacity: 0, transition: { duration: 0.12 } },
  };

  const modalVariants = shouldReduceMotion
    ? reducedMotionVariants
    : glassSheetVariants;

  return (
    <AnimatePresence mode="wait">
      {open && (
        <Dialog
          static
          open={open}
          onClose={onClose}
          className="relative z-50"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/82 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 md:p-6 pointer-events-none">
            <Dialog.Panel className="pointer-events-auto w-full max-w-6xl h-[92vh]">
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={modalVariants}
                style={{
                  transformOrigin: "bottom center",
                  willChange: "transform, filter, opacity",
                }}
                className="w-full h-full rounded-3xl bg-zinc-950/90 border border-zinc-800/80 shadow-2xl flex flex-col overflow-hidden shadow-cyan-950/20 transform-gpu backdrop-blur-xl"
              >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-900/60 backdrop-blur">
                <div>
                  <Dialog.Title className="text-white font-semibold flex items-center gap-2">
                    PDF Viewer
                  </Dialog.Title>
                  <p className="text-xs text-zinc-400">
                    Page {currentPage}
                    {numPages ? ` of ${numPages}` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    title="Previous page (Left Arrow)"
                    className="p-2 rounded-lg hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="w-5 h-5 text-zinc-300" />
                  </button>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(numPages || p, p + 1))
                    }
                    disabled={numPages > 0 && currentPage >= numPages}
                    title="Next page (Right Arrow)"
                    className="p-2 rounded-lg hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight className="w-5 h-5 text-zinc-300" />
                  </button>

                  <button
                    onClick={() => setScale((s) => Math.min(3, s + 0.2))}
                    title="Zoom in (+)"
                    className="p-2 rounded-lg hover:bg-zinc-800 transition"
                  >
                    <ZoomIn className="w-5 h-5 text-zinc-300" />
                  </button>

                  <button
                    onClick={() => setScale((s) => Math.max(0.8, s - 0.2))}
                    title="Zoom out (-)"
                    className="p-2 rounded-lg hover:bg-zinc-800 transition"
                  >
                    <ZoomOut className="w-5 h-5 text-zinc-300" />
                  </button>

                  <button
                    onClick={onClose}
                    title="Close (Esc)"
                    className="p-2 rounded-lg hover:bg-red-500/20 transition"
                  >
                    <X className="w-5 h-5 text-zinc-300" />
                  </button>
                </div>
              </div>

              {/* PDF Content */}
              <div
                className="flex-1 overflow-auto flex justify-center py-6 bg-zinc-950 select-none"
                onWheel={(e) => {
                  if (!e.ctrlKey) return;

                  e.preventDefault();

                  setScale((s) =>
                    Math.min(3, Math.max(0.8, s + (e.deltaY < 0 ? 0.1 : -0.1))),
                  );
                }}
              >
                {loadingPdf ? (
                  <div className="text-zinc-400 animate-pulse text-sm mt-20">
                    Loading PDF...
                  </div>
                ) : pdfError ? (
                  <div className="text-red-400 text-sm mt-20">
                    Failed to load PDF.
                  </div>
                ) : (
                  pdfUrl && (
                    <Document
                      file={pdfUrl}
                      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                      onLoadError={(err) =>
                        console.error("PDF render error:", err)
                      }
                    >
                      <Page pageNumber={currentPage} scale={scale} />
                    </Document>
                  )
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-zinc-800 px-5 py-3 text-xs text-zinc-500 flex justify-between">
                <span>← → Navigate pages | Esc to close</span>
                <span>Ctrl + Mouse Wheel to zoom | Zoom: {Math.round(scale * 100)}%</span>
              </div>
            </motion.div>
          </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}