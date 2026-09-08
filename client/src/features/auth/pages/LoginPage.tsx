import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
  Cpu,
} from "lucide-react";

const LoginPage = () => {
  const { loginUser, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginUser(form);
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden bg-[#090a0f] text-zinc-100">
      {/* Background Ambient Radial Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 sm:w-175 sm:h-175 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute top-1/3 left-1/4 w-87.5 h-87.5 sm:w-112.5 sm:h-112.5 bg-purple-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-75 h-75 sm:w-100 sm:h-100 bg-blue-500/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="w-full max-w-md relative z-10 my-8">
        {/* Top Logo / Brand Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 text-xs font-semibold text-cyan-300 backdrop-blur-md shadow-lg shadow-cyan-500/5 hover:border-cyan-500/30 hover:scale-105 transition-all duration-300 group"
          >
            <div className="w-6 h-6 rounded-full bg-linear-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <span className="tracking-wide">NEXUS AI PLATFORM</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
          </Link>
        </motion.div>

        {/* Card Glow Wrap */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative group"
        >
          {/* Subtle Outer Neon Border Glow */}
          <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500" />

          {/* Main Glassmorphism Card */}
          <div className="relative rounded-3xl bg-zinc-950/80 border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
            {/* Header Section */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Welcome{" "}
                <span className="bg-linear-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent glow-text">
                  Back
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
                Sign in to access your AI engineering knowledge base and RAG workflows.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
                >
                  Email Address
                </label>
                <div className="relative flex items-center group/input">
                  <div className="absolute left-3.5 pointer-events-none text-zinc-400 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    className="w-full bg-zinc-900/80 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
                  >
                    Password
                  </label>
                </div>
                <div className="relative flex items-center group/input">
                  <div className="absolute left-3.5 pointer-events-none text-zinc-400 transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className="w-full bg-zinc-900/80 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-zinc-400 hover:text-zinc-200 focus:outline-none transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full relative flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/35 border border-white/10 group mt-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-200" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Security Badges */}
            <div className="flex items-center justify-center gap-4 mt-6 text-[11px] text-zinc-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>AES-256 Encrypted</span>
              </div>
              <span className="text-zinc-700">•</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Sub-85ms Latency</span>
              </div>
            </div>

            {/* Sign Up Footer Link */}
            <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs sm:text-sm text-zinc-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors hover:underline focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded px-1"
              >
                Create an Account
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;

