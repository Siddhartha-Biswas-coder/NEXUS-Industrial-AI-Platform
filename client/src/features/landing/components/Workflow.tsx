import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  Scissors,
  Cpu,
  Database,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Code2,
  Zap
} from "lucide-react";

export const Workflow = () => {
  const [activeStep, setActiveStep] = useState(0);

  const pipelineSteps = [
    {
      step: "01",
      title: "Upload PDF",
      subtitle: "Multi-file Dropzone",
      icon: Upload,
      color: "from-cyan-500 to-blue-500",
      accentBg: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      description: "Drop manuals, specifications, and papers into the secure browser vault.",
      techDetails: "Supports PDF, DOCX, TXT. File hashing prevents duplicates.",
      codeSnippet: `// 1. Client-Side Upload Ingestion
const file = event.target.files[0];
const formData = new FormData();
formData.append("document", file);
await api.post("/documents/upload", formData);`,
    },
    {
      step: "02",
      title: "Extract Text",
      subtitle: "Document Parsing",
      icon: FileText,
      color: "from-blue-500 to-indigo-500",
      accentBg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      description: "Automated OCR and structural layout analysis extract clean text blocks.",
      techDetails: "Removes headers/footers, extracts tables and clean Markdown text.",
      codeSnippet: `// 2. Structured Layout Text Extraction
const rawText = await pdfParser.extractText(fileBuffer, {
  preserveFormatting: true,
  extractTables: true
});`,
    },
    {
      step: "03",
      title: "Smart Chunking",
      subtitle: "Semantic Splitting",
      icon: Scissors,
      color: "from-indigo-500 to-purple-500",
      accentBg: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      description: "Documents are split into 512-token chunks with 50-token context overlap.",
      techDetails: "Recursive character splitter keeps sentences and paragraphs intact.",
      codeSnippet: `// 3. Recursive Semantic Chunking
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,
  chunkOverlap: 50,
});
const chunks = await splitter.splitText(rawText);`,
    },
    {
      step: "04",
      title: "Embeddings",
      subtitle: "Vectorization",
      icon: Cpu,
      color: "from-purple-500 to-pink-500",
      accentBg: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      description: "High-dimensional vector embeddings are computed for every chunk.",
      techDetails: "OpenAI text-embedding-3 / BGE dense vector representations.",
      codeSnippet: `// 4. Dense Vector Generation
const embeddings = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: chunks.map(c => c.pageContent),
});`,
    },
    {
      step: "05",
      title: "Pinecone Search",
      subtitle: "Vector Store Index",
      icon: Database,
      color: "from-pink-500 to-rose-500",
      accentBg: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      description: "Indexed into Pinecone serverless DB for sub-100ms cosine similarity matches.",
      techDetails: "Top-K nearest neighbor chunk retrieval matched against query vector.",
      codeSnippet: `// 5. Pinecone Cosine Similarity Query
const queryResponse = await pineconeIndex.query({
  vector: userQueryVector,
  topK: 4,
  includeMetadata: true
});`,
    },
    {
      step: "06",
      title: "Grounded AI Answers",
      subtitle: "LLM Generation",
      icon: ShieldCheck,
      color: "from-rose-500 to-cyan-500",
      accentBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      description: "Synthesizes final answer backed by exact page numbers and source citations.",
      techDetails: "Strict prompt grounding eliminates AI hallucination completely.",
      codeSnippet: `// 6. Citation Grounded Synthesis
const answer = await llm.generate({
  systemPrompt: "Answer ONLY using retrieved contexts below...",
  context: queryResponse.matches,
  question: userPrompt
});`,
    },
  ];

  return (
    <section id="workflow" className="py-24 md:py-32 relative z-10 overflow-hidden bg-zinc-950/60 border-y border-white/5">
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/3 left-1/4 w-150 h-150 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-150 h-150 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400">
            <Zap className="w-3.5 h-3.5" />
            <span>Under The Hood</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The Nexus{" "}
            <span className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              RAG Pipeline
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            From raw PDF documents to grounded AI answers in seconds. Here is how our 6-stage engineering pipeline works.
          </p>
        </div>

        {/* Visual Pipeline Nodes - Horizontal / Vertical Responsive Container */}
        <div className="relative">
          {/* Connecting Glowing Beam Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-linear-to-r from-cyan-500 via-purple-500 to-emerald-500 -translate-y-1/2 opacity-30 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
            {pipelineSteps.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeStep === index;

              return (
                <motion.div
                  key={item.step}
                  onClick={() => setActiveStep(index)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`cursor-pointer rounded-2xl p-5 transition-all duration-300 relative border flex flex-col justify-between ${
                    isActive
                      ? "glass-card border-cyan-400/60 shadow-xl shadow-cyan-500/20 -translate-y-2"
                      : "bg-zinc-900/60 border-white/10 hover:border-white/20 hover:-translate-y-1"
                  }`}
                >
                  {/* Step Sequence Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-zinc-500">
                      STEP {item.step}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${item.accentBg}`}
                    >
                      {item.subtitle}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-tr ${item.color} text-white shadow-lg`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300">
                      {item.title}
                    </h3>

                    <p className="text-xs text-zinc-400 leading-normal line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow Indicator for Desktop */}
                  {index < pipelineSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                      <div className="w-6 h-6 rounded-full bg-zinc-900 border border-white/20 flex items-center justify-center text-zinc-400">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Interactive Pipeline Inspector Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 max-w-4xl mx-auto glass-card rounded-2xl p-6 border border-white/15"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Pipeline Stage {pipelineSteps[activeStep].step} Inspector
                </div>
                <h4 className="text-lg font-bold text-white">
                  {pipelineSteps[activeStep].title} — Technical Logic
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">Click any step above to inspect</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-semibold text-zinc-300">Stage Description</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {pipelineSteps[activeStep].description}
              </p>

              <div className="p-3 rounded-xl bg-zinc-950/70 border border-white/5 space-y-1.5 text-xs">
                <span className="text-[11px] font-semibold text-purple-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Engineering Details
                </span>
                <p className="text-[11px] text-zinc-300">
                  {pipelineSteps[activeStep].techDetails}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-zinc-950 rounded-xl p-4 border border-white/10 font-mono text-xs text-cyan-300 overflow-x-auto">
              <div className="flex items-center justify-between text-[11px] text-zinc-500 pb-2 border-b border-white/5 mb-3 font-sans">
                <span>{pipelineSteps[activeStep].title.toLowerCase().replace(/ /g, "_")}.ts</span>
                <span>TypeScript / Pinecone SDK</span>
              </div>
              <pre className="whitespace-pre text-[11px] leading-relaxed">
                <code>{pipelineSteps[activeStep].codeSnippet}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Workflow;
