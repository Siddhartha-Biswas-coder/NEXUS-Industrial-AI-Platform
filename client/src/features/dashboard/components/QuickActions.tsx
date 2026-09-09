import { Upload, MessageSquare, FolderOpen, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Upload PDF",
      description: "Add a technical document",
      icon: Upload,
      action: () => navigate("/documents"),
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Ask AI",
      description: "Start a RAG conversation",
      icon: MessageSquare,
      action: () => navigate("/chat"),
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "Browse Documents",
      description: "View uploaded files",
      icon: FolderOpen,
      action: () => navigate("/documents"),
      color: "from-purple-500 to-pink-600",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Quick Actions</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </h2>
          <p className="text-xs text-zinc-400">
            Accelerate your workflow with industrial AI tooling
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.title}
              onClick={item.action}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="relative text-left rounded-3xl p-6 bg-zinc-950/60 border border-white/10 backdrop-blur-2xl shadow-xl transition-all duration-500 group overflow-hidden cursor-pointer flex flex-col justify-between min-h-40"
            >
              {/* Outer Glowing Border Background Accent */}
              <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 pointer-events-none" />

              {/* Card Ambient Glow Orb */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10">
                {/* Header Row: Glowing Icon & Arrow Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${item.color} p-0.5 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-zinc-900/80 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-cyan-300 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </div>

                {/* Content: Title & Description */}
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
}
