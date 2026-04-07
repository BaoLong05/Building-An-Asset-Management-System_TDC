import React from "react";
import AdminDashboard from "../pages/admin/dashboard";
import AssetManagement from "../pages/AssetManagement/AssetManagement";
import AdminLayout from "./AdminLayout/AdminLayout";
import CategoryManagement from "../pages/CategoryManagement/CategoryManagement";
import RoomManagement from "../pages/RoomManagement/RoomManagement";
import MaintenanceManagement from "../pages/MaintenanceManagement/MaintenanceManagement";
import Profile from "../pages/Profile/Profile";
import Notification from "../pages/Notification/Notification";
import ProtectedRoute from "./Protected";

const AdminRoutes = {
  path: "/admin",
  element: <ProtectedRoute />,
  children: [
    {
      element: <AdminLayout />,
      children: [
        {
          path: "dashboard",
          element: <AdminDashboard />,
        },
        {
          path: "asset-management",
          element: <AssetManagement />,
        },
        {
          path: "category-management",
          element: <CategoryManagement />,
        },
        {
          path: "room-management",
          element: <RoomManagement />,
        },
        {
          path: "maintenance-management",
          element: <MaintenanceManagement />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "notification",
          element: <Notification />,
        },
      ],
    },
  ],
};

export default AdminRoutes;
