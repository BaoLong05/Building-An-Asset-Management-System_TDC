import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./header.css";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); 
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

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

        {/* Right - Profile + Notification */}
        <div className="right-group">
          {/* Nút Thông báo */}
          <Link to="/admin/notification" className="notification-btn" title="Thông báo" onClick={() => handleNavigate("/admin/notification")}>
            <svg viewBox="0 0 24 24" className="notification-icon">
              <path d="M18 8a6 6 0 0 0-12 0c0 5.77-3.77 10-9 12h2.62c.7 0 1.38-.1 2-.3.62.2 1.3.3 2 .3s1.38-.1 2-.3c.62.2 1.3.3 2 .3s1.38-.1 2-.3c.62.2 1.3.3 2 .3s1.38-.1 2-.3c.62.2 1.3.3 2 .3s1.38-.1 2-.3V20h2c-5.23-2-9-6.23-9-12z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>   
          </Link>
          <div
            className="profile-avatar"
            onClick={() => handleNavigate("/admin/profile")}
            title="Hồ sơ"
          >
            <svg viewBox="0 0 24 24" className="avatar-svg">
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
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