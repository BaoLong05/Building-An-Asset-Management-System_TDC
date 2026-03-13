import React from "react";
import AdminDashboard from "../pages/admin/dashboard";
import AssetManagement from "../pages/AssetManagement/AssetManagement";
import AdminLayout from "./AdminLayout/AdminLayout";
import CategoryManagement from "../pages/CategoryManagement/CategoryManagement";
import RoomManagement from "../pages/RoomManagement/RoomManagement"; 
import MaintenanceManagement from "../pages/MaintenanceManagement/MaintenanceManagement";

const AdminRoutes = {
  path: "/admin",
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
      element: <CategoryManagement/>
    },
    {
      path: "room-management",
      element: <RoomManagement/>
    },
    {
      path: "maintenance-management",
      element: <MaintenanceManagement/>
    },
  ],
};

export default AdminRoutes;