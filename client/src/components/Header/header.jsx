import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="college-header">
      {/* Top Bar with Contact Info */}
      <div className="top-bar">
        <div className="container">
          <div className="contact-info">
            <div className="info-item">
              <span className="icon">📍</span>
              <span>53 Võ Văn Ngân, Phường Thủ Đức, TP.HCM</span>
            </div>
            <div className="info-item">
              <span className="icon">📞</span>
              <span>028.3897.0023 - 028.3897.2339</span>
            </div>
            <div className="info-item">
              <span className="icon">📠</span>
              <span>028.3896.2474</span>
            </div>
          </div>
          
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">📘</a>
            <a href="#" className="social-link" aria-label="YouTube">▶️</a>
            <a href="#" className="social-link" aria-label="Email">📧</a>
          </div>
        </div>
      </div>

      {/* Main Header with Logo and Navigation */}
      <div className="main-header">
        <div className="container">
          <div className="logo-section">
            <div className="logo-icon">
              <span className="school-icon">🏛️</span>
            </div>
            <div className="school-name">
              <h1>TRƯỜNG CAO ĐẲNG CÔNG NGHỆ THỦ ĐỨC</h1>
              <p className="slogan">Thực học - Thực nghiệp</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* Navigation Menu */}
          <nav className={`main-nav ${mobileMenuOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item"><a href="#" className="nav-link active">Trang chủ</a></li>
              <li className="nav-item"><a href="#" className="nav-link">Giới thiệu</a></li>
              <li className="nav-item"><a href="#" className="nav-link">Tuyển sinh</a></li>
              <li className="nav-item"><a href="#" className="nav-link">Đào tạo</a></li>
              <li className="nav-item"><a href="#" className="nav-link">Khoa - Phòng</a></li>
              <li className="nav-item"><a href="#" className="nav-link">Nghiên cứu</a></li>
              <li className="nav-item"><a href="#" className="nav-link">Liên hệ</a></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Breadcrumb (optional) */}
      <div className="breadcrumb">
        <div className="container">
          <span className="breadcrumb-item">Trang chủ</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item active">Quản lý tài sản</span>
        </div>
      </div>
    </header>
  );
};

export default Header;