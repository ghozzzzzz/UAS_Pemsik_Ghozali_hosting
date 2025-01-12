import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AdminLayout from "./pages/Layout/AdminLayout";
import PublicLayout from "./pages/Layout/PublicLayout";
import Dashboard from "./pages/Dashboard";
import FireIncidents from "./pages/Public/FireIncidents";
import DroughtIncidents from "./pages/Public/DroughtIncidents";
import AdminFireIncidents from "./pages/Admin/AdminFireIncidents";
import AdminDroughtIncidents from "./pages/Admin/AdminDroughtIncidents";
import ProtectedRoute from "./pages/Component/ProtectedRoute";

const RouteList = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "fire-incidents",
        element: <FireIncidents />
      },
      {
        path: "drought-incidents",
        element: <DroughtIncidents />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard isAdmin={true} />
      },
      {
        path: "fire-incidents",
        element: <AdminFireIncidents />
      },
      {
        path: "drought-incidents",
        element: <AdminDroughtIncidents />
      }
    ]
  }
]);

export default RouteList;
