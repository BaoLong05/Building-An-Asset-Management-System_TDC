import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  document.title = "404 - Không tìm thấy trang";
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="notfound-wrapper">
      <div className="notfound-card">
        {/* Icon */}
        <div className="notfound-icon">
          <span className="icon">🔍</span>
        </div>

        {/* Error Code */}
        <div className="error-code">
          <span className="code">4</span>
          <span className="code zero">0</span>
          <span className="code">4</span>
        </div>

        {/* Title */}
        <h1 className="error-title">Không tìm thấy trang</h1>

        {/* Description */}
        <p className="error-description">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>

        {/* Actions */}
        <div className="error-actions">
          <button onClick={goBack} className="btn btn-secondary">
            ← Quay lại
          </button>
          <Link to="/admin/dashboard" className="btn btn-primary">
            🏠 Về trang chủ
          </Link>
        </div>

        {/* Quick Links */}
        <div className="quick-links">
          <span className="links-label">Hoặc truy cập nhanh:</span>
          <div className="links-group">
            <Link to="/admin/asset-management" className="quick-link">📦 Tài sản</Link>
            <Link to="/admin/category-management" className="quick-link">📁 Danh mục</Link>
            <Link to="/admin/room-management" className="quick-link">🏢 Phòng ban</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;