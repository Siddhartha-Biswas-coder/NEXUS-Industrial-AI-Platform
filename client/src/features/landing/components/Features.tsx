import { motion } from "framer-motion";
import {
  MessageSquare,
  FileSearch,
  Quote,
  ShieldCheck,
  Sparkles,
  Layers,
  CheckCircle2
} from "lucide-react";

export const Features = () => {
  const mainFeatures = [
    {
      id: "ai-chat",
      title: "AI Chat",
      subtitle: "Contextual RAG Reasoning Engine",
      badge: "Pinecone RAG Powered",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      glowColor: "from-cyan-500/20 to-blue-500/5",
      borderColor: "hover:border-cyan-500/40",
      icon: MessageSquare,
      iconBg: "bg-cyan-500/20 text-cyan-400",
      description:
        "Ask complex natural language questions across hundreds of uploaded engineering manuals, research papers, and technical specifications with instant, contextual answers.",
      visualPreview: (
        <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="text-zinc-400 text-[11px]">Session: RAG_Query_#4092</span>
            <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              ● Active RAG
            </span>
          </div>
          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-zinc-900/90 text-zinc-300 text-[11px] border border-white/5">
              <span className="text-cyan-400 font-semibold">User:</span> How do we configure high-availability failover in Section 9?
            </div>
            <div className="p-2.5 rounded-lg bg-cyan-950/30 text-cyan-200 text-[11px] border border-cyan-500/30 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-cyan-400 font-sans">
                <span className="font-semibold">Nexus AI Response</span>
                <span>Latency: 72ms</span>
              </div>
              <p className="font-sans text-xs text-zinc-200">
                Failover is enabled by setting <code className="text-cyan-300 bg-cyan-500/10 px-1 rounded">HA_REPLICAS=3</code> and pairing with Pinecone pod replicas across Availability Zones.
              </p>
            </div>
          </div>
        </div>
      ),
      highlights: [
        "Multi-document synthesis",
        "Sub-100ms vector query latency",
        "Natural conversational memory",
      ],
    },
    {
      id: "pdf-intelligence",
      title: "PDF Intelligence",
      subtitle: "Smart Structural Parsing & Vector Chunking",
      badge: "Automated Pipeline",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      glowColor: "from-purple-500/20 to-pink-500/5",
      borderColor: "hover:border-purple-500/40",
      icon: FileSearch,
      iconBg: "bg-purple-500/20 text-purple-400",
      description:
        "Raw PDFs are automatically extracted, cleaned, and split into optimal 512-token semantic chunks, maintaining header hierarchies, code blocks, and technical tables.",
      visualPreview: (
        <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 space-y-2.5 text-xs">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-purple-300 font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Chunk #128 (512 tokens)
            </span>
            <span className="text-zinc-500">Overlap: 50 tokens</span>
          </div>

          <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/30 font-mono text-[11px] text-purple-200 space-y-1">
            <div className="text-[10px] text-purple-400 font-sans font-semibold">
              Vector Embedding Vector: [0.024, -0.891, 0.412, ...]
            </div>
            <p className="text-zinc-300 font-sans text-xs">
              "SECTION 4.2: Hydraulic pressure boundaries must be inspected every 500 operating hours..."
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
            <div className="p-1.5 rounded bg-zinc-900 border border-white/5 text-zinc-400">
              Header Depth: H2
            </div>
            <div className="p-1.5 rounded bg-zinc-900 border border-white/5 text-purple-300">
              Density: High
            </div>
            <div className="p-1.5 rounded bg-zinc-900 border border-white/5 text-emerald-400">
              Status: Indexed
            </div>
          </div>
        </div>
      ),
      highlights: [
        "Recursive character splitting",
        "Preserves tables & code blocks",
        "Automatic metadata tagging",
      ],
    },
    {
      id: "source-citations",
      title: "Source Citations",
      subtitle: "Verifiable & Grounded Answer Traceability",
      badge: "Zero Hallucination",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      glowColor: "from-blue-500/20 to-cyan-500/5",
      borderColor: "hover:border-blue-500/40",
      icon: Quote,
      iconBg: "bg-blue-500/20 text-blue-400",
      description:
        "Every AI output comes with clickable source citations linking directly to exact PDF pages, paragraph coordinates, and vector similarity confidence scores.",
      visualPreview: (
        <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Citation Card
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Confidence: 98.4%
            </span>
          </div>

          <div className="p-3 rounded-lg bg-zinc-900/90 border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-cyan-300 font-semibold">
                Doc: System_Specs_2026.pdf
              </span>
              <span className="text-zinc-400">Page 142</span>
            </div>
            <p className="text-[11px] text-zinc-300 italic border-l-2 border-cyan-400 pl-2">
              "...maximum allowable voltage surge is 450V for 10ms transient spikes..."
            </p>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1 border-t border-white/5">
            <span>Direct PDF Highlight Match</span>
            <span className="text-cyan-400 underline cursor-pointer">Jump to Page →</span>
          </div>
        </div>
      ),
      highlights: [
        "Direct page & line linking",
        "Confidence score metrics",
        "Complete audit trail",
      ],
    },
  ];

  return (
    <section id="features" className="py-24 md:py-32 relative z-10 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-125 bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered for{" "}
            <span className="bg-linear-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
              Technical Intelligence
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Nexus combines vector search accuracy, automated document parsing, and state-of-the-art LLMs into a seamless RAG knowledge engine.
          </p>
        </div>

        {/* Three Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`group relative rounded-3xl glass-card p-8 flex flex-col justify-between glass-card-hover border border-white/10 ${feature.borderColor} overflow-hidden`}
              >
                {/* Subtle Card Ambient Glow */}
                <div
                  className={`absolute -top-24 -right-24 w-48 h-48 bg-linear-to-br ${feature.glowColor} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`}
                />

                <div className="space-y-6 relative z-10">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${feature.iconBg} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${feature.badgeColor}`}
                    >
                      {feature.badge}
                    </span>
                  </div>

                  {/* Header Title & Subtitle */}
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      {feature.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Interactive Micro UI Preview */}
                  <div className="pt-2">{feature.visualPreview}</div>
                </div>

                {/* Bottom Highlights Checklist */}
                <div className="pt-6 mt-6 border-t border-white/10 space-y-2 relative z-10">
                  {feature.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Extra Enterprise Feature Grid */}
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-zinc-950/40 border border-white/5 hover:border-white/15 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
              100%
            </div>
            <div className="text-xs text-zinc-400 font-medium mt-1">
              Pinecone Vector Indexing
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/40 border border-white/5 hover:border-white/15 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">
              &lt; 85ms
            </div>
            <div className="text-xs text-zinc-400 font-medium mt-1">
              Dense Retrieval Latency
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/40 border border-white/5 hover:border-white/15 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono">
              512 Tokens
            </div>
            <div className="text-xs text-zinc-400 font-medium mt-1">
              Smart Semantic Chunking
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/40 border border-white/5 hover:border-white/15 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              0%
            </div>
            <div className="text-xs text-zinc-400 font-medium mt-1">
              Unverified Answers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
