import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = () => {
  return (
    <div className="h-screen w-screen bg-[#090a0f] text-white flex p-3 sm:p-4 gap-3 sm:gap-4 overflow-hidden">
      {/* Floating Sidebar */}
      <Sidebar />

      {/* Right Column: Topbar & Content */}
      <div className="flex-1 flex flex-col min-w-0 gap-3 sm:gap-4 h-full overflow-hidden">
        {/* Floating Topbar */}
        <Topbar />

        {/* Scrollable Main Content Container */}
        <main className="flex-1 overflow-y-auto rounded-2xl md:rounded-3xl border border-white/10 bg-zinc-950/40 backdrop-blur-md p-4 sm:p-6 md:p-8 shadow-xl shadow-black/40 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
