import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const RootLayout = () => {
  const { checkAuth, loading } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090a0f] text-white">
        Loading Nexus...
      </div>
    );
  }

  return <Outlet />;
};

export default RootLayout;
