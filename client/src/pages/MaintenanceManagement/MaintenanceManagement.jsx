import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MaintenanceManagement.css";
import {
  getMaintenanceAssets,
} from "../../utils/helper";

const MaintenanceManagement = () => {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [maintenanceHistory, setMaintenanceHistory] = useState([]);
  const [maintenanceNote, setMaintenanceNote] = useState("");

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateNote, setUpdateNote] = useState("");

  const [assetPage, setAssetPage] = useState(1);
  const [assetLastPage, setAssetLastPage] = useState(1);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyLastPage, setHistoryLastPage] = useState(1);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode-maintenance");
  };

  // =========================
  // FETCH API
  // =========================
  const fetchAssets = async (page = 1, status = filterStatus) => {
    const res = await getMaintenanceAssets(page, status);

    if (res && res.success) {
      setAssets(res.data.data);
      setAssetPage(res.data.current_page);
      setAssetLastPage(res.data.last_page);
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    fetchAssets(1, filterStatus);
  }, [filterStatus]);

  // =========================
  // EXPORT (placeholder)
  // =========================
  const handleExportExcel = () => {
    toast.info("Tính năng xuất Excel sẽ được phát triển sau 📊");
  };

  const handleExportPDF = () => {
    toast.info("Tính năng xuất PDF sẽ được phát triển sau 📄");
  };

  // =========================
  // VIEW DETAILS
  // =========================
  const handleViewDetails = async (asset) => {
    setSelectedAsset(asset);
    setShowDetailModal(true);

    const res = await getMaintenanceHistory(asset.MaTaiSan, 1);
    if (res.success) {
      setMaintenanceHistory(res.data.data);
      setHistoryPage(res.data.current_page);
      setHistoryLastPage(res.data.last_page);
    } else {
      toast.error(res.message);
    }
  };

  // =========================
  // CHANGE HISTORY PAGE
  // =========================
  const changeHistoryPage = async (page) => {
    if (page < 1 || page > historyLastPage) return;
    
    const res = await getMaintenanceHistory(selectedAsset.MaTaiSan, page);
    if (res.success) {
      setMaintenanceHistory(res.data.data);
      setHistoryPage(res.data.current_page);
      setHistoryLastPage(res.data.last_page);
    }
  };

  // =========================
  // CHANGE ASSET PAGE
  // =========================
  const changeAssetPage = (page) => {
    if (page < 1 || page > assetLastPage) return;
    fetchAssets(page, filterStatus);
  };

  // =========================
  // OPEN UPDATE MODAL
  // =========================
  const handleUpdateStatus = (asset) => {
    setSelectedAsset(asset);
    setUpdateStatus(asset.TrangThai);
    setUpdateNote("");
    setShowUpdateModal(true);
  };

  // =========================
  // SUBMIT UPDATE
  // =========================
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    const res = await updateMaintenanceStatus(
      selectedAsset.MaTaiSan,
      updateStatus,
      updateNote
    );

    if (res.success) {
      toast.success("Cập nhật trạng thái thành công!");
      fetchAssets(assetPage, filterStatus);
      setShowUpdateModal(false);
    } else {
      toast.error(res.message);
    }
  };

  // =========================
  // ADD MAINTENANCE NOTE
  // =========================
  const handleAddNote = async () => {
    if (!maintenanceNote.trim()) {
      toast.warning("Vui lòng nhập ghi chú");
      return;
    }

    const res = await addMaintenanceNote(
      selectedAsset.MaTaiSan,
      maintenanceNote
    );

    if (res.success) {
      toast.success("Thêm ghi chú thành công!");
      setMaintenanceNote("");
      
      // Refresh history
      const historyRes = await getMaintenanceHistory(selectedAsset.MaTaiSan, 1);
      if (historyRes.success) {
        setMaintenanceHistory(historyRes.data.data);
        setHistoryPage(historyRes.data.current_page);
        setHistoryLastPage(historyRes.data.last_page);
      }
    } else {
      toast.error(res.message);
    }
  };

  // =========================
  // SEARCH
  // =========================
  const filteredAssets = assets.filter((asset) => {
    const search = searchTerm.toLowerCase();
    return (
      asset.TenTaiSan?.toLowerCase().includes(search) ||
      String(asset.MaTaiSan).includes(search) ||
      (asset.LoaiTaiSan || "").toLowerCase().includes(search) ||
      (asset.Phong?.TenPhong || "").toLowerCase().includes(search)
    );
  });

  // =========================
  // STATS
  // =========================
  const stats = {
    total: assets.length,
    good: assets.filter(a => a.TrangThai?.toLowerCase() === 'tốt').length,
    maintenance: assets.filter(a => a.TrangThai?.toLowerCase() === 'đang bảo trì').length,
    broken: assets.filter(a => a.TrangThai?.toLowerCase() === 'hỏng').length,
  };

  // =========================
  // GET STATUS CLASS
  // =========================
  const getStatusClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'tốt': return 'good';
      case 'đang bảo trì': return 'maintenance';
      case 'hỏng': return 'broken';
      default: return '';
    }
  };

  // =========================
  // GET STATUS ICON
  // =========================
  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'tốt': return '✅';
      case 'đang bảo trì': return '🔧';
      case 'hỏng': return '❌';
      default: return '❓';
    }
  };

  return (
    <div className={`maintenance-management ${darkMode ? "dark" : ""}`}>
      {/* Top Bar với Theme Toggle */}
      <div className="top-bar-maintenance">
        <div className="header-title">
          <h1>
            <i className="fas fa-tools"></i>
            Quản Lý Bảo Trì
          </h1>
        </div>

        <div className="top-bar-actions">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </button>
          <div className="language-select">
            <select>
              <option value="vn">🇻🇳 Tiếng Việt</option>
              <option value="us">🇺🇸 English</option>
            </select>
          </div>
          <div className="user-profile">
            <span className="avatar">👤</span>
            <span className="user-name">Admin</span>
          </div>
        </div>
      </div>

    

      {/* ACTION BAR */}
      <div className="action-bar">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Tìm kiếm tài sản..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="right-actions">
          <div className="filter-group">
            <select 
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">📋 Tất cả trạng thái</option>
              <option value="good">✅ Tốt</option>
              <option value="maintenance">🔧 Đang bảo trì</option>
              <option value="broken">❌ Hỏng</option>
            </select>
          </div>

          <div className="export-group">
            <button className="btn-export excel" onClick={handleExportExcel}>
              📊 Excel
            </button>
            <button className="btn-export pdf" onClick={handleExportPDF}>
              📄 PDF
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="maintenance-table">
          <thead>
            <tr>
              <th>MÃ TÀI SẢN</th>
              <th>TÊN TÀI SẢN</th>
              <th>LOẠI</th>
              <th>PHÒNG</th>
              <th>TRẠNG THÁI</th>
              <th>HÀNH ĐỘNG</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset) => (
                <tr key={asset.MaTaiSan}>
                  <td>
                    <span className="code-badge">{asset.MaTaiSan}</span>
                  </td>
                  <td>
                    <div className="asset-name">
                      <i className="fas fa-box"></i>
                      {asset.TenTaiSan}
                    </div>
                  </td>
                  <td>{asset.LoaiTaiSan || "Chưa phân loại"}</td>
                  <td>{asset.Phong?.TenPhong || "Chưa có phòng"}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(asset.TrangThai)}`}>
                      <span className="status-dot"></span>
                      {getStatusIcon(asset.TrangThai)} {asset.TrangThai || "Chưa xác định"}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon view"
                        onClick={() => handleViewDetails(asset)}
                        title="Xem lịch sử"
                      >
                        <i className="fas fa-history"></i>
                        Lịch sử
                      </button>
                      <button
                        className="btn-icon edit"
                        onClick={() => handleUpdateStatus(asset)}
                        title="Cập nhật trạng thái"
                      >
                        <i className="fas fa-sync-alt"></i>
                        Cập nhật
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-data">
                  <i className="fas fa-box-open"></i>
                  <p>Không có dữ liệu</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button
            disabled={assetPage === 1}
            onClick={() => changeAssetPage(assetPage - 1)}
          >
            <i className="fas fa-chevron-left"></i>
            Quay Lại
          </button>

          <span>
            Trang {assetPage} / {assetLastPage}
          </span>

          <button
            disabled={assetPage === assetLastPage}
            onClick={() => changeAssetPage(assetPage + 1)}
          >
            Tiếp Theo
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="table-footer">
        <span>
          Tổng số tài sản: <strong>{filteredAssets.length}</strong>
        </span>
        <span className="footer-note">
          <i className="fas fa-info-circle"></i>
          {stats.maintenance} tài sản đang bảo trì, {stats.broken} tài sản hỏng
        </span>
      </div>

      {/* DETAIL MODAL - Lịch sử bảo trì */}
      {showDetailModal && selectedAsset && (
        <div className="modal-overlay-maintenance">
          <div className="modal-maintenance detail-modal">
            <div className="detail-header">
              <h2>
                <i className="fas fa-history"></i>
                Lịch sử bảo trì
              </h2>
              <div className="asset-info">
                <strong>{selectedAsset.TenTaiSan}</strong>
                <span>(Mã: {selectedAsset.MaTaiSan})</span>
              </div>
            </div>

            <div className="detail-table-container">
              {/* Current Status */}
              <div className="current-status">
                <h3>
                  <i className="fas fa-info-circle"></i>
                  Trạng thái hiện tại
                </h3>
                <div className="status-display">
                  <span className={`status-badge large ${getStatusClass(selectedAsset.TrangThai)}`}>
                    <span className="status-dot"></span>
                    {getStatusIcon(selectedAsset.TrangThai)} {selectedAsset.TrangThai}
                  </span>
                </div>
              </div>

              {/* Add Note */}
              <div className="add-note-section">
                <h3>
                  <i className="fas fa-pen"></i>
                  Thêm ghi chú bảo trì
                </h3>
                <div className="note-input-group">
                  <textarea
                    value={maintenanceNote}
                    onChange={(e) => setMaintenanceNote(e.target.value)}
                    placeholder="Nhập ghi chú bảo trì..."
                    rows="3"
                  />
                  <button 
                    className="btn-add-note"
                    onClick={handleAddNote}
                  >
                    <i className="fas fa-plus"></i>
                    Thêm ghi chú
                  </button>
                </div>
              </div>

              {/* History Table */}
              <h3>
                <i className="fas fa-clock"></i>
                Lịch sử bảo trì
              </h3>
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Ngày</th>
                    <th>Người thực hiện</th>
                    <th>Trạng thái</th>
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenanceHistory.length > 0 ? (
                    maintenanceHistory.map((item, index) => (
                      <tr key={index}>
                        <td>{new Date(item.NgayBaoTri).toLocaleDateString('vi-VN')}</td>
                        <td>{item.NguoiThucHien || "Hệ thống"}</td>
                        <td>
                          <span className={`status-badge small ${getStatusClass(item.TrangThai)}`}>
                            {getStatusIcon(item.TrangThai)} {item.TrangThai}
                          </span>
                        </td>
                        <td>{item.GhiChu || "—"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="no-data">
                        Chưa có lịch sử bảo trì
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* History Pagination */}
              {maintenanceHistory.length > 0 && (
                <div className="pagination small">
                  <button
                    disabled={historyPage === 1}
                    onClick={() => changeHistoryPage(historyPage - 1)}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <span>
                    {historyPage} / {historyLastPage}
                  </span>
                  <button
                    disabled={historyPage === historyLastPage}
                    onClick={() => changeHistoryPage(historyPage + 1)}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </div>

            <div className="detail-actions">
              <button
                className="btn-close-detail"
                onClick={() => {
                  setShowDetailModal(false);
                  setMaintenanceNote("");
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE STATUS MODAL */}
      {showUpdateModal && selectedAsset && (
        <div className="modal-overlay-maintenance">
          <div className="modal-maintenance">
            <h2>
              <i className="fas fa-sync-alt"></i>
              Cập nhật trạng thái
            </h2>

            <form onSubmit={handleSubmitUpdate}>
              <div className="form-group">
                <label>Tài sản:</label>
                <div className="asset-display">
                  <strong>{selectedAsset.TenTaiSan}</strong>
                  <span className="code">{selectedAsset.MaTaiSan}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Trạng thái mới:</label>
                <div className="status-options">
                  <label className="status-option">
                    <input
                      type="radio"
                      name="status"
                      value="Tốt"
                      checked={updateStatus === "Tốt"}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                    />
                    <span className="status-badge good">
                      <span className="status-dot"></span>
                      ✅ Tốt
                    </span>
                  </label>

                  <label className="status-option">
                    <input
                      type="radio"
                      name="status"
                      value="Đang bảo trì"
                      checked={updateStatus === "Đang bảo trì"}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                    />
                    <span className="status-badge maintenance">
                      <span className="status-dot"></span>
                      🔧 Đang bảo trì
                    </span>
                  </label>

                  <label className="status-option">
                    <input
                      type="radio"
                      name="status"
                      value="Hỏng"
                      checked={updateStatus === "Hỏng"}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                    />
                    <span className="status-badge broken">
                      <span className="status-dot"></span>
                      ❌ Hỏng
                    </span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Ghi chú:</label>
                <textarea
                  value={updateNote}
                  onChange={(e) => setUpdateNote(e.target.value)}
                  placeholder="Nhập ghi chú (lý do, kế hoạch sửa chữa...)"
                  rows="3"
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowUpdateModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-update">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default MaintenanceManagement;