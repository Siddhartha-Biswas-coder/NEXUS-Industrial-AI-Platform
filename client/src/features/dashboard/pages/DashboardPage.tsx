import QuickActions from "../components/QuickActions";
import RecentDocuments from "../components/RecentDocuments";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <QuickActions />
      <RecentDocuments />
    </div>
  );
}
