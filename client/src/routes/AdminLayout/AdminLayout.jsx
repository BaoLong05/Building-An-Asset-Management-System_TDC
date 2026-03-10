import { Outlet } from "react-router-dom";
import SidebarLayout from "../../components/SidebarLayout/SidebarLayout";
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-container">

      <SidebarLayout />

      <div className="admin-content">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;