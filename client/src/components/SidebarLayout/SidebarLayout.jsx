import { NavLink } from "react-router-dom";
import "./SidebarLayout.css";

const menuItems = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: "📊", 
    path: "/admin/dashboard",
  },
  {
    id: "assets",
    name: "Quản Lý Tài Sản",
    icon: "🔧", 
    path: "/admin/asset-management",
  },
  {
    id: "categories",
    name: "Quản Lý Danh Mục",
    icon: "📋", 
    path: "/admin/category-management",
  },
  {
    id: "room",
    name: "Quản Lý Phòng Học",
    icon: "🏫", 
    path: "/admin/room-management",
  },
  {
    id: "borrow",
    name: "Mượn trả",
    icon: "🔄", 
    path: "/admin/borrow",
  },
  {
    id: "reports",
    name: "Báo cáo",
    icon: "📑", 
    path: "/admin/reports",
  },
  {
    id: "settings",
    name: "Cài đặt",
    icon: "⚙️", 
    path: "/admin/settings",
  },
];

function SidebarLayout() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <h2>📦 Quản Lý Tài Sản</h2> 
      </div>

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <span className="logout-icon">🚪</span> 
          <span>Đăng xuất</span>
        </button>
      </div>

    </aside>
  );
}

export default SidebarLayout;