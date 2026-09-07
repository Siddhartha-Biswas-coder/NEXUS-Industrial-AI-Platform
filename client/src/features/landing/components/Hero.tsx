import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Play,
  FileText,
  Search,
  CheckCircle2,
  Database,
  Cpu,
  Zap,
  ExternalLink,
  MessageSquare,
  Layers,
  ChevronRight
} from "lucide-react";

export const Hero = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "vectors" | "chunks">("chat");
  const [selectedCitation, setSelectedCitation] = useState<number | null>(1);
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Soft Ambient Radial Background Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 md:w-225 md:h-225 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-100 h-100 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-87.5 h-87.5 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Hero Text Container */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Announcement Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 text-xs sm:text-sm font-medium text-cyan-300 backdrop-blur-md shadow-lg shadow-cyan-500/5 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>Nexus AI 2.0 Released</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-400">Pinecone Vector RAG Architecture</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            Your Engineering Knowledge.{" "}
            <span className="bg-linear-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent glow-text">
              Instantly Searchable.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            Upload manuals, research papers, and technical documents. Nexus transforms them into an AI-powered knowledge assistant with contextual answers and source citations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold text-white bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 border border-white/10 group"
            >
              <Sparkles className="w-5 h-5 text-cyan-200" />
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => setShowDemoModal(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800/90 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 group"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span>Watch Demo</span>
            </button>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-6 text-xs sm:text-sm text-zinc-400 border-t border-white/5 max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Pinecone Vector Indexing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>Zero Hallucination RAG</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Exact Citation Traceability</span>
            </div>
          </motion.div>
        </div>

        {/* Floating Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 md:mt-20 relative max-w-6xl mx-auto"
        >
          {/* Ambient Glow behind dashboard */}
          <div className="absolute -inset-1.5 bg-linear-to-r from-cyan-500 via-purple-600 to-blue-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-subtle" />

          {/* Floating Side Badges */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:flex absolute -left-12 top-24 z-30 items-center gap-3 px-4 py-3 rounded-xl glass-card text-xs font-medium text-white shadow-2xl border border-cyan-500/30 backdrop-blur-xl"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-zinc-400 text-[10px] uppercase tracking-wider">Vector Store</div>
              <div className="text-white font-semibold flex items-center gap-1.5">
                Pinecone Serverless
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:flex absolute -right-10 bottom-24 z-30 items-center gap-3 px-4 py-3 rounded-xl glass-card text-xs font-medium text-white shadow-2xl border border-purple-500/30 backdrop-blur-xl"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-zinc-400 text-[10px] uppercase tracking-wider">Retrieval Speed</div>
              <div className="text-purple-300 font-semibold">Sub-85ms Latency</div>
            </div>
          </motion.div>

          {/* Main Dashboard Canvas Container */}
          <div className="relative rounded-2xl bg-zinc-950/90 border border-white/15 overflow-hidden shadow-2xl backdrop-blur-2xl">
            {/* macOS Style Window Chrome Header */}
            <div className="h-12 bg-zinc-900/90 border-b border-white/10 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-mono text-zinc-400 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  nexus-knowledge-engine.app / rag-session-084
                </span>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 bg-zinc-950/60 p-1 rounded-lg border border-white/5 text-xs">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === "chat"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    AI RAG Chat
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("vectors")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === "vectors"
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Vector Store
                  </span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Index Online
              </div>
            </div>

            {/* Dashboard Inner Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-115 text-zinc-200 text-sm">
              {/* Left Sidebar: Document Vault */}
              <div className="lg:col-span-4 bg-zinc-950/70 border-r border-white/10 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-400 tracking-wider uppercase flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    Indexed Documents (3)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    Pinecone Ready
                  </span>
                </div>

                <div className="space-y-2">
                  {/* Doc Item 1 */}
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 transition-all cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-white truncate">
                          Turbine_Engine_Manual_v4.pdf
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-400">
                          <span>1,420 chunks</span>
                          <span>•</span>
                          <span className="text-emerald-400">100% Vectorized</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Doc Item 2 */}
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-white/15 transition-all cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-zinc-300 truncate">
                          Pinecone_Vector_Spec.pdf
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-500">
                          <span>840 chunks</span>
                          <span>•</span>
                          <span>Dense Embeddings</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Doc Item 3 */}
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-white/15 transition-all cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-zinc-300 truncate">
                          Avionics_Systems_2026.pdf
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-500">
                          <span>2,100 chunks</span>
                          <span>•</span>
                          <span>1536 Dimensions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Index Info Widget */}
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-white/5 space-y-2 text-xs">
                  <div className="text-zinc-400 font-mono text-[11px] flex justify-between">
                    <span>Index Namespace:</span>
                    <span className="text-cyan-400 font-semibold">default_prod</span>
                  </div>
                  <div className="text-zinc-400 font-mono text-[11px] flex justify-between">
                    <span>Metric:</span>
                    <span className="text-purple-400 font-semibold">Cosine Similarity</span>
                  </div>
                  <div className="text-zinc-400 font-mono text-[11px] flex justify-between">
                    <span>Top-K Chunks:</span>
                    <span className="text-white font-semibold">4 Chunks</span>
                  </div>
                </div>
              </div>

              {/* Right Panel: Active View (RAG Chat View) */}
              <div className="lg:col-span-8 p-5 flex flex-col justify-between space-y-4 bg-zinc-950/40">
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold text-white text-sm">
                      Contextual Knowledge Assistant
                    </span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    Grounded Mode • Strict Citations
                  </span>
                </div>

                {/* Chat Log */}
                <div className="space-y-4 overflow-y-auto max-h-75 pr-1">
                  {/* User Query Message */}
                  <div className="flex items-start gap-3 justify-end">
                    <div className="max-w-xl p-3.5 rounded-2xl rounded-tr-none bg-linear-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-500/30 text-white text-xs sm:text-sm">
                      <p className="font-medium">
                        "What is the maximum continuous operating temperature specified for the Stage 3 High-Pressure Turbine?"
                      </p>
                    </div>
                  </div>

                  {/* Retrieval Banner */}
                  <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 px-3 py-1.5 rounded-lg w-fit">
                    <Search className="w-3.5 h-3.5 animate-pulse" />
                    <span>Pinecone Query: Found 4 match vectors (similarity scores 0.96, 0.91, 0.88, 0.84) in 64ms</span>
                  </div>

                  {/* AI Response Message */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-linear-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                      NX
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="p-4 rounded-2xl rounded-tl-none bg-zinc-900/90 border border-white/10 text-xs sm:text-sm text-zinc-200 leading-relaxed space-y-2">
                        <p>
                          According to <span className="text-cyan-300 font-mono underline cursor-pointer">Turbine_Engine_Manual_v4.pdf (Page 48)</span>, the maximum continuous operating temperature for the <strong className="text-white">Stage 3 High-Pressure Turbine (HPT)</strong> is <strong className="text-cyan-300 font-mono">1,450°C (2,642°F)</strong>.
                        </p>
                        <p className="text-zinc-400 text-xs">
                          Peak thermal excursion threshold is capped at <strong className="text-zinc-200">1,520°C</strong> for a maximum allowable duration of 120 seconds before thermal protection interlocks activate.
                        </p>
                      </div>

                      {/* Interactive Source Citations Box */}
                      <div className="space-y-2">
                        <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                          <ExternalLink className="w-3 h-3 text-purple-400" />
                          Verified Grounded Sources (2 Citations)
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {/* Citation Card 1 */}
                          <div
                            onClick={() => setSelectedCitation(1)}
                            className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                              selectedCitation === 1
                                ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-200"
                                : "bg-zinc-900/60 border-white/5 text-zinc-400 hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                              <span className="font-semibold text-white">
                                [Source 1] Page 48
                              </span>
                              <span className="text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded text-[10px]">
                                96% Match
                              </span>
                            </div>
                            <p className="line-clamp-2 text-[11px] text-zinc-300">
                              "...stage 3 HPT continuous limit is 1450°C under standard ISA conditions..."
                            </p>
                          </div>

                          {/* Citation Card 2 */}
                          <div
                            onClick={() => setSelectedCitation(2)}
                            className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                              selectedCitation === 2
                                ? "bg-purple-500/15 border-purple-500/40 text-purple-200"
                                : "bg-zinc-900/60 border-white/5 text-zinc-400 hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                              <span className="font-semibold text-white">
                                [Source 2] Page 52
                              </span>
                              <span className="text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded text-[10px]">
                                91% Match
                              </span>
                            </div>
                            <p className="line-clamp-2 text-[11px] text-zinc-300">
                              "...thermal protection interlocks trigger shutdown if peak exceeds 1520°C..."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Bar Preview */}
                <div className="pt-2">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      readOnly
                      value="Ask anything about your engineering documents..."
                      className="w-full bg-zinc-900/90 border border-white/15 rounded-xl px-4 py-3 text-xs text-zinc-400 focus:outline-none cursor-default pr-24"
                    />
                    <button className="absolute right-2 px-3 py-1.5 rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs flex items-center gap-1 shadow-md">
                      <span>Query</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Demo Modal (Watch Demo Action) */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card max-w-2xl w-full rounded-2xl p-6 relative space-y-4 border border-cyan-500/30"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-cyan-400 fill-current" />
                <h3 className="text-lg font-bold text-white">Nexus RAG Platform Demo</h3>
              </div>
              <button
                onClick={() => setShowDemoModal(false)}
                className="text-zinc-400 hover:text-white px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video rounded-xl bg-zinc-900 border border-white/10 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 animate-pulse">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <h4 className="text-base font-semibold text-white">
                Interactive Knowledge Querying in Action
              </h4>
              <p className="text-xs text-zinc-400 max-w-md">
                Nexus chunks engineering PDFs into 512-token segments, computes OpenAI embeddings, stores vectors in Pinecone, and delivers exact answers in under 100ms.
              </p>
              <Link
                to="/signup"
                onClick={() => setShowDemoModal(false)}
                className="mt-2 px-6 py-2.5 rounded-lg bg-linear-to-r from-cyan-500 to-purple-600 text-white font-semibold text-xs"
              >
                Try Nexus Now Free
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Hero;
