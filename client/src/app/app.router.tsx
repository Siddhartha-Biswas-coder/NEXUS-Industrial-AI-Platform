import { createBrowserRouter } from "react-router-dom";

import LandingPage from "../features/landing/pages/LandingPage";
import LoginPage from "../features/auth/pages/LoginPage";
import SignupPage from "../features/auth/pages/SignupPage";

import DashboardPage from "../features/dashboard/pages/DashboardPage";
import ChatPage from "../features/chat/pages/ChatPage";
import DocumentsPage from "../features/documents/pages/DocumentsPage";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/documents",
        element: <DocumentsPage />,
      },
    ],
  },
]);
