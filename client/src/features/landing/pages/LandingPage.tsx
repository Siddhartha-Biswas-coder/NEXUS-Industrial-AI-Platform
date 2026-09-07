import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Workflow from "../components/Workflow";
import Footer from "../components/Footer";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <Features />
        <Workflow />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
