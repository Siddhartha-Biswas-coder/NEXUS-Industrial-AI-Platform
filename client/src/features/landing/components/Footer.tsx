import { Link } from "react-router-dom";
import { Cpu, ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 bg-zinc-950 border-t border-white/10 pt-16 pb-12 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Brand & Description Column */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-tr from-cyan-500/20 via-purple-500/20 to-blue-500/20 border border-white/10">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                NEXUS
              </span>
            </Link>

            <p className="text-zinc-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Nexus transforms complex engineering manuals, research papers, and technical documents into an instant AI knowledge assistant powered by Pinecone vector search.
            </p>

            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Pinecone Index Status: <strong className="text-emerald-400 font-mono">Operational</strong></span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#features" className="hover:text-cyan-400 transition-colors">
                  AI RAG Features
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-cyan-400 transition-colors">
                  RAG Pipeline Architecture
                </a>
              </li>
              <li>
                <Link to="/login" className="hover:text-cyan-400 transition-colors">
                  Document Vault Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-cyan-400 transition-colors">
                  Create Free Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
              Connect & Source
            </h4>
            <p className="text-xs text-zinc-400">
              Built with React 19, TypeScript, Vite, Tailwind CSS, OpenAI Embeddings, and Pinecone Vector Database.
            </p>

            {/* GitHub & LinkedIn Social Placeholders */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-cyan-500/40 hover:bg-zinc-800 transition-all text-xs font-medium group"
              >
                <svg className="w-4 h-4 fill-current text-cyan-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-purple-500/40 hover:bg-zinc-800 transition-all text-xs font-medium group"
              >
                <svg className="w-4 h-4 fill-current text-purple-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Nexus AI Platform. All rights reserved. Built for high-precision technical retrieval.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-cyan-400 transition-colors p-1.5 rounded-lg hover:bg-white/5"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
