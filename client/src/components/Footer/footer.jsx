import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        {/* Thông tin trường */}
        <div className="footer-section">
          <div className="footer-logo">
            <div className="logo-icon">🏛️</div>
            <div className="logo-text">
              <h3>TDC</h3>
              <p>Quản lý tài sản trường học</p>
            </div>
          </div>
          <p className="footer-desc">
            Hệ thống quản lý tài sản hiện đại, dành cho khoa Công Nghệ Thông Tin.
          </p>
        </div>

        {/* Menu nhanh */}
        <div className="footer-section">
          <h4>Menu</h4>
          <ul>
            <li><Link to="/admin/dashboard">Trang chủ</Link></li>
            <li><Link to="/admin/asset-management">Tài sản</Link></li>
            <li><Link to="/admin/category-management">Danh mục</Link></li>
            <li><Link to="/admin/room-management">Vị trí</Link></li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div className="footer-section">
          <h4>Liên hệ</h4>
          <ul>
            <li>📧 tdc@mail.tdc.edu.vn - tdc@tdc.edu.vn</li>
            <li>📞  028.38966825 - 028.38970023</li>
            <li>📍 Địa chỉ: 53 Võ Văn Ngân, Phường Thủ Đức, Thành phố Hồ Chí Minh</li>
            <li>⏰ 8:00 - 17:00 (T2-T6)</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Hệ thống</h4>
          <ul>
            <li>Phát triển bởi: Trần Bảo Long</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 TDC - Quản Lý Tài Sản.</p>
      </div>
    </footer>
  );
};

export default Footer;