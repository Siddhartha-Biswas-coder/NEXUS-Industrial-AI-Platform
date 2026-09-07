import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../shared/hooks/useAppSelector";

const PublicRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
