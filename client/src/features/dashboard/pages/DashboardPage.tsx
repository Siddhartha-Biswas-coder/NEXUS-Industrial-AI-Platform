import QuickActions from "../components/QuickActions";
import RecentDocuments from "../components/RecentDocuments";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 p-8 space-y-8">
          <QuickActions />
          <RecentDocuments />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
