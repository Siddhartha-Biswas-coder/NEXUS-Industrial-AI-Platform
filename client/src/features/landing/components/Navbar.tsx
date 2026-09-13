import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { useAppSelector } from "../../../shared/hooks";

export const Navbar = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Workflow", href: "#workflow" },
    { name: "Architecture", href: "#architecture" },
    { name: "Docs", href: "https://github.com", external: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-tr from-cyan-500/20 via-purple-500/20 to-blue-500/20 border border-white/10 group-hover:border-cyan-500/50 transition-all duration-300 shadow-lg shadow-cyan-500/10">
            <BrainCircuit className="w-5 h-5 text-cyan-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                NEXUS
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                AI
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 tracking-wider uppercase hidden sm:block">
              RAG Knowledge Engine
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/70 px-3.5 py-2 backdrop-blur-md shadow-md hover:border-cyan-500/30 hover:bg-zinc-900 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative shrink-0 w-9 h-9 rounded-xl bg-linear-to-tr from-cyan-500 via-blue-500 to-purple-600 p-0.5 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center font-bold text-xs text-cyan-300">
                  {initials}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
              </div>

              <div className="text-left">
                <p className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                  {user?.name || "Engineer"}
                </p>
                <p className="text-[11px] text-zinc-400 capitalize font-medium leading-tight">
                  {user?.role || "User"}
                </p>
              </div>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-zinc-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="relative inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 border border-white/10 group"
              >
                <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-4"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-zinc-300 hover:text-white py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900 px-4 py-2.5 shadow-md hover:border-cyan-500/30 transition-all duration-200"
                >
                  <div className="relative shrink-0 w-9 h-9 rounded-xl bg-linear-to-tr from-cyan-500 via-blue-500 to-purple-600 p-0.5 shadow-md shadow-cyan-500/20">
                    <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center font-bold text-xs text-cyan-300">
                      {initials}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-xs font-semibold text-white">
                      {user?.name || "Engineer"}
                    </p>
                    <p className="text-[11px] text-zinc-400 capitalize font-medium">
                      {user?.role || "User"}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center text-sm font-medium text-zinc-300 hover:text-white py-2.5 rounded-lg bg-zinc-900 border border-white/10"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-white py-2.5 rounded-lg bg-linear-to-r from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/20"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
