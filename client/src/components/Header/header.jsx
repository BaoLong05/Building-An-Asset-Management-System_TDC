import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./header.css";
import { useNotification } from "../../context/NotificationContext";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { notifications } = useNotification();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const unreadCount = notifications?.filter((n) => !n.is_read)?.length || 0;

  useEffect(() => {
    document.body.style.paddingTop = '80px';
    return () => document.body.style.paddingTop = '0';
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigate = (path) => {
    if (!token) {
      navigate("/"); 
      toast.success("Vui lòng đăng nhập để xem các tác vụ!");
    } else {
      navigate(path);
    }
  };

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo" onClick={() => handleNavigate("/")}>
          <div className="logo-icon">
            <img src="/logo/logo1.png" alt="TDC" />
          </div>
          <div className="logo-text">
            <span className="logo-title">TDC</span>
            <span className="logo-sub">Quản lý tài sản</span>
          </div>
        </div>

        {/* Nav */}
        <nav className={`nav-menu ${mobileMenuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li onClick={() => handleNavigate("/admin/dashboard")}>
              <span className="nav-link">Trang chủ</span>
            </li>
            <li onClick={() => handleNavigate("/admin/asset-management")}>
              <span className="nav-link">Tài sản</span>
            </li>
            <li onClick={() => handleNavigate("/admin/category-management")}>
              <span className="nav-link">Danh mục</span>
            </li>
            <li onClick={() => handleNavigate("/admin/room-management")}>
              <span className="nav-link">Vị trí</span>
            </li>
            <li onClick={() => handleNavigate("/admin/maintenance-management")}>
              <span className="nav-link">Bảo trì</span>
            </li>
          </ul>
        </nav>

        {/* Right - Controls */}
        <div className="right-group">
          {/* Theme Toggle */}
          <button className="header-btn" onClick={toggleDarkMode} title={darkMode ? "Sáng" : "Tối"}>
            {darkMode ? (
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Notification */}
          <Link to="/admin/notification" className="header-btn" title="Thông báo" onClick={() => handleNavigate("/admin/notification")}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </Link>

          {/* Profile */}
          <div className="header-btn" onClick={() => handleNavigate("/admin/profile")} title="Hồ sơ">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
              <circle cx="12" cy="7" r="4"/>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            </svg>
          </div>

          <button className="mobile-toggle" onClick={toggleMobileMenu}>
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
