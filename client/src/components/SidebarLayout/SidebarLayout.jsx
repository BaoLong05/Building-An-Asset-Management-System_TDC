import { NavLink, useNavigate } from "react-router-dom";
import "./SidebarLayout.css";
import { logout } from "../../utils/helper";
import { toast } from "react-toastify";

const menuItems = [
  { id: "dashboard", name: "Dashboard", icon: "📊", path: "/admin/dashboard" },
  { id: "assets", name: "Quản Lý Tài Sản", icon: "🔧", path: "/admin/asset-management" },
  { id: "categories", name: "Quản Lý Danh Mục", icon: "📋", path: "/admin/category-management" },
  { id: "room", name: "Vị trí sử dụng", icon: "🏫", path: "/admin/room-management" },
  { id: "maintenance", name: "Quản Lý Bảo Trì", icon: "🔄", path: "/admin/maintenance-management" },
  { id: "notification", name: "Thông Báo", icon: "📑", path: "/admin/notification" },
  { id: "profile", name: "Thông tin cá nhân", icon: "👤", path: "/admin/profile" },
  { id: "settings", name: "Cài đặt", icon: "⚙️", path: "/admin/settings" },
];

const SidebarLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await logout();

    if (res) {
      toast.success("Đăng xuất thành công");
      sessionStorage.removeItem("token");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

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
        <button onClick={handleLogout} className="logout-btn">
          <span className="logout-icon">🚪</span>
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarLayout;