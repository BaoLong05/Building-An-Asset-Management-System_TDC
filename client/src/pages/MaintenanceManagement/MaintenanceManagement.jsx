import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MaintenanceManagement.css";

import {
  getMaintenanceAssets,
  getMaintenanceHistory,
  updateMaintenanceStatus,
  exportExcel,
  exportPDF,
  getMe,
} from "../../utils/helper";

const MaintenanceManagement = () => {
  document.title = "Quản Lý Bảo Trì";
  const [currentUser, setCurrentUsers] = useState(null);
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showModalExcel, setShowModalExcel] = useState(false);

  const [exportFilters, setExportFilters] = useState({
    TinhTrang: "",
  });

  const [showExportModal, setShowExportModal] = useState(false);
  const [exprotFilter, setExprotFilter] = useState({
    TinhTrang: "",
  });

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [maintenanceHistory, setMaintenanceHistory] = useState([]);

  const [updateStatus, setUpdateStatus] = useState("");
  const [updateNote, setUpdateNote] = useState("");

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // =========================
  // TOGGLE DARK MODE
  // =========================
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode-maintenance");
  };

  // =========================
  // FETCH DATA
  // =========================
const fetchAssets = async (page = 1, search = "", status = "") => {
  const res = await getMaintenanceAssets(page, search, status);

  if (res.success) {
    setAssets(res.data.data);
    setPage(res.data.current_page);
    setLastPage(res.data.last_page);
  } else {
    toast.error(res.message);
  }
};

  useEffect(() => {
  fetchAssets(page, searchTerm, filterStatus);

  const token = sessionStorage.getItem("token");
  if (token) {
    getMe(token).then((res) => {
      if (res.data) setCurrentUsers(res.data);
    });
  }
}, [page, searchTerm, filterStatus]);

  // =========================
  // EXPORT
  // =========================
  const handleExportExcel = () => {
    exportExcel(
      "exportExcel/baotri",
      {
        TinhTrang: filterStatus,
      },
      "baotri.xlsx",
    );
  };

  const handleExportPDF = () => {
    exportPDF(
      "export/baotri",
      {
        TinhTrang: filterStatus,
      },
      "danhsach_baotri.pdf",
    );
  };



  const handleViewDetails = async (asset) => {
    setSelectedAsset(asset);
    setShowDetailModal(true);

    const res = await getMaintenanceHistory(asset.MaTaiSan);

    if (res.success) {
      const sorted = res.data.sort(
        (a, b) => new Date(b.NgayBaoTri) - new Date(a.NgayBaoTri),
      );
      setMaintenanceHistory(sorted);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    const res = await updateMaintenanceStatus(
      selectedAsset.MaBaoTri,
      updateStatus,
      updateNote,
      selectedAsset.updated_at,
    );

    if (res.success) {
      toast.success("Cập nhật thành công!");

      setAssets((prev) =>
        prev.map((item) =>
          item.MaBaoTri === selectedAsset.MaBaoTri
            ? {
                ...item,
                TinhTrang: updateStatus,
                NoiDung: updateNote,
              }
            : item,
        ),
      );

      setShowUpdateModal(false);
    } else {
      toast.error(res.message);
    }
  };

  // =========================
  // GET STATUS CLASS
  // =========================
  const getStatusClass = (status) => {
    switch (status) {
      case "Hoàn thành":
        return "good";
      case "Đang bảo trì":
        return "maintenance";
      case "Hỏng":
        return "broken";
      default:
        return "";
    }
  };

  // =========================
  // GET STATUS ICON
  // =========================
  const getStatusIcon = (status) => {
    switch (status) {
      case "Hoàn thành":
        return "✅";
      case "Đang bảo trì":
        return "🔧";
      case "Hỏng":
        return "❌";
      default:
        return "❓";
    }
  };

  const stats = {
    total: assets.length,
    maintenance: assets.filter((a) => a.TinhTrang === "Đang bảo trì").length,
    completed: assets.filter((a) => a.TinhTrang === "Hoàn thành").length,
  };

  //kiem tra user truoc khi cap nhat
  const handleEditClick = (assets) => {
    if (assets.assigned_to !== currentUser?.id) {
      toast.warning("Bạn không có quyền cập nhật bảo trì này!");
      return;
    }
    setSelectedAsset(assets);
    setUpdateStatus(assets.TinhTrang);
    setUpdateNote(assets.NoiDung || "");
    setShowUpdateModal(true);
  };
  const groupedAssets = Object.values(
    assets.reduce((acc, item) => {
      const key = item.MaTaiSan;

      if (!acc[key]) {
        acc[key] = {
          ...item,
          historyCount: 1,
        };
      } else {
        acc[key].historyCount += 1;

        if (new Date(item.NgayBaoTri) > new Date(acc[key].NgayBaoTri)) {
          acc[key] = {
            ...item,
            historyCount: acc[key].historyCount,
          };
        }
      }

      return acc;
    }, {}),
  ).sort((a, b) => new Date(b.NgayBaoTri || 0) - new Date(a.NgayBaoTri || 0));
  return (
    <div className={`maintenance-management ${darkMode ? "dark" : ""}`}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={darkMode ? "dark" : "light"}
      />
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
      <div className="action-bar">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Tìm kiếm tài sản..."
            value={searchTerm}
            maxLength={255}
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
              <option value="">📋 Tất cả trạng thái</option>
              <option value="Đang bảo trì">🔧 Đang bảo trì</option>
              <option value="Hoàn thành">✅ Hoàn thành</option>
            </select>
          </div>

          <div className="export-group">
            <button
              className="btn-export excel"
              onClick={() => {
                setShowModalExcel(true);
              }}
              title="Xuất Excel"
            >
              📊 Excel
            </button>
            <button
              className="btn-export pdf"
              onClick={() => setShowExportModal(true)}
              title="Xuất PDF"
            >
              📄 PDF
            </button>
          </div>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="maintenance-table">
          <thead>
            <tr>
              <th>MÃ TÀI SẢN</th>
              <th>TÊN TÀI SẢN</th>
              <th>TRẠNG THÁI</th>
              <th>THAO TÁC</th>
              <th>NGƯỜI NHẬN</th>
              <th>NGƯỜI GỬI</th>
            </tr>
          </thead>

          <tbody>
            {assets.length > 0 ? (
              groupedAssets
                .filter((a) => {
                  const search = searchTerm.toLowerCase();

                  return (
                    ((a.taisan?.TenTaiSan || "")
                      .toLowerCase()
                      .includes(search) ||
                      String(a.MaTaiSan).includes(search)) &&
                    (filterStatus ? a.TinhTrang === filterStatus : true)
                  );
                })
                .map((a) => (
                  <tr key={a.MaBaoTri}>
                    <td>
                      <span className="code-badge">{a.MaTaiSan}</span>
                    </td>

                    <td>
                      <div className="asset-name">
                        <i className="fas fa-box"></i>
                        {a.taisan?.TenTaiSan || "Không có tên"}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${getStatusClass(a.TinhTrang)}`}
                      >
                        <span className="status-dot"></span>
                        {getStatusIcon(a.TinhTrang)} {a.TinhTrang}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon view"
                          onClick={() => handleViewDetails(a)}
                          title="Xem lịch sử"
                        >
                          <i className="fas fa-history"></i>
                          Lịch sử
                        </button>

                        <button
                          className="btn-icon edit"
                          onClick={() => handleEditClick(a)}
                          title="Cập nhật trạng thái"
                        >
                          <i className="fas fa-sync-alt"></i>
                          Cập nhật
                        </button>
                      </div>
                    </td>

                    <td>{a.assignee?.name || "-"}</td>
                    <td>{a.creator?.name || "-"}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={4} className="no-data">
                  <i className="fas fa-box-open"></i>
                  <p>Không có dữ liệu</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          className="page-btn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <i className="fas fa-chevron-left"></i>
          Trước
        </button>

        <span className="page-info">
          Trang {page} / {lastPage}
        </span>

        <button
          className="page-btn"
          disabled={page === lastPage}
          onClick={() => setPage(page + 1)}
        >
          Sau
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      {showDetailModal && selectedAsset && (
        <div
          className="modal-overlay-maintenance"
          onClick={() => setShowDetailModal(false)}
        >
          <div
            className="modal-maintenance detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="detail-header">
              <div className="header-with-close">
                <h2>
                  <i className="fas fa-history"></i>
                  Lịch sử bảo trì
                </h2>
                <button
                  className="modal-close-btn"
                  onClick={() => setShowDetailModal(false)}
                  title="Đóng"
                >
                  X<i className="fas fa-times"></i>
                </button>
              </div>
              <div className="asset-info">
                <strong>{selectedAsset.taisan?.TenTaiSan}</strong>
                <span>(Mã: {selectedAsset.MaTaiSan})</span>
              </div>
            </div>

            <div className="detail-table-container">
              <div className="current-status">
                <h3>
                  <i className="fas fa-info-circle"></i>
                  Trạng thái hiện tại
                </h3>
                <div className="status-display">
                  <span
                    className={`status-badge large ${getStatusClass(selectedAsset.TinhTrang)}`}
                  >
                    <span className="status-dot"></span>
                    {getStatusIcon(selectedAsset.TinhTrang)}{" "}
                    {selectedAsset.TinhTrang}
                  </span>
                </div>
              </div>

              <h3>
                <i className="fas fa-clock"></i>
                Lịch sử bảo trì
              </h3>

              {maintenanceHistory.length === 0 ? (
                <div className="no-data">
                  <i className="fas fa-history"></i>
                  <p>Chưa có lịch sử bảo trì</p>
                </div>
              ) : (
                <div className="history-scroll">
                  <div className="history-list">
                    {maintenanceHistory.map((h, index) => (
                      <React.Fragment key={index}>
                        <div className="history-item">
                          <div className="history-time">
                            <i className="far fa-calendar-alt"></i>
                            {new Date(h.NgayBaoTri).toLocaleString("vi-VN")}
                          </div>
                          <div className="history-content">
                            <span
                              className={`status-badge small ${getStatusClass(h.TinhTrang)}`}
                            >
                              {getStatusIcon(h.TinhTrang)} {h.TinhTrang}
                            </span>
                            <span className="history-note">
                              <div>🧑 Người Gửi: {h.creator?.name || "—"}</div>{" "}
                              <br />
                              <div>
                                👨‍🔧 Người Nhận: {h.assignee?.name || "—"}
                              </div>
                              <div>
                                {" "}
                                Nội Dung: {h.NoiDung || "Không có ghi chú"}
                              </div>
                            </span>
                          </div>
                        </div>

                        {index < maintenanceHistory.length - 1 && (
                          <div className="history-divider"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {showUpdateModal && selectedAsset && (
        <div
          className="modal-overlay-maintenance"
          onClick={() => setShowUpdateModal(false)}
        >
          <div
            className="modal-maintenance"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-with-close">
              <h2>
                <i className="fas fa-sync-alt"></i>
                Cập nhật trạng thái
              </h2>
              <button
                className="modal-close-btn"
                onClick={() => setShowUpdateModal(false)}
                title="Đóng"
              >
                X<i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmitUpdate}>
              <div className="form-group">
                <label>Tài sản:</label>
                <div className="asset-display">
                  <strong>{selectedAsset.taisan?.TenTaiSan}</strong>
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
                      value="Hoàn thành"
                      checked={updateStatus === "Hoàn thành"}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                    />
                    <span className="status-badge good">
                      <span className="status-dot"></span>✅ Hoàn thành
                    </span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Ghi chú:</label>
                <textarea
                  placeholder="Nhập ghi chú..."
                  value={updateNote}
                  onChange={(e) => setUpdateNote(e.target.value)}
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
      {/* {Modal export excel} */}
      {showModalExcel && (
        <div className="modal-overlay" onClick={() => setShowModalExcel(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Xuất EXCEL</h2>
              <button onClick={() => setShowModalExcel(false)}>X</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="Tình Trạng"></label>
                <select
                  value={exportFilters.TinhTrang}
                  onChange={(e) =>
                    setExportFilters({
                      ...exportFilters,
                      TinhTrang: e.target.value,
                    })
                  }
                >
                  <option value="">Tất cả</option>
                  <option value="Đang bảo trì">Đang bảo trì</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowModalExcel(false)}>Hủy</button>

              <button
                className="btn-save"
                onClick={() => {
                  exportExcel(
                    "exportExcel/baotri",
                    exportFilters,
                    "baotri.xlsx",
                  );
                  setShowModalExcel(false);
                }}
              >
                {" "}
                Xuất Excel
              </button>
            </div>
          </div>
        </div>
      )}
      {/*Export modal*/}
      {showExportModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowExportModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Xuất PDF</h2>
              <button onClick={() => setShowExportModal(false)}>X</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Trạng Thái</label>
                <select
                  value={exprotFilter.TinhTrang}
                  onChange={(e) =>
                    setExprotFilter({
                      ...exprotFilter,
                      TinhTrang: e.target.value,
                    })
                  }
                >
                  <option value="">Tất cả</option>
                  <option value="Đang bảo trì">Đang bảo trì</option>
                  <option value="Hoàn thành">Hoàn Thành</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowExportModal(false)}>Hủy</button>
              <button
                className="btn-save"
                onClick={() => {
                  exportPDF(
                    "export/baotri",
                    exprotFilter,
                    "danhsach_baotri.pdf",
                  );
                  setShowExportModal(false);
                }}
              >
                Xuẩt PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceManagement;
