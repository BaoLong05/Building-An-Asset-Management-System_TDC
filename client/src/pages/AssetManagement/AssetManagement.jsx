import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AssetManagement.css";
import {
  getAssets,
  addAsset,
  updateAsset,
  deleteAsset,
  getCategories,
  getRoom,
  exportExcel,
} from "../../utils/helper";

const AssetManagement = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editAsset, setEditAsset] = useState(null);
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    good: 0,
    maintenance: 0,
    broken: 0,
    totalValue: 0,
  });
  const [showDetail, setShowDetail] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [maintenanceAsset, setMaintenanceAsset] = useState(null);
  const [maintenanceStatus, setMaintenanceStatus] = useState("Tốt");
  const [maintenanceNote, setMaintenanceNote] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [showExportModalExcel, setShowExportModalExcel] = useState(false);

   const [exportFilters, setExportFilters] = useState({
    keyword: "",
    MaDanhMuc: "",
    MaPhong: "",
    TinhTrang: "",
  });
  const [formData, setFormData] = useState({
    TenTaiSan: "",
    MaDanhMuc: "",
    MaPhong: "",
    SoLuong: "",
    DonGia: "",
    NgayNhap: "",
    TinhTrang: "Tốt",
    GhiChu: "",
  });

  useEffect(() => {
    fetchAssets();
    fetchCategories();
    fetchRooms();
  }, []);

  useEffect(() => {
    fetchAssets(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode-asset");
    } else {
      document.body.classList.remove("dark-mode-asset");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const fetchAssets = async (page = 1) => {
    setLoading(true);
    try {
      const response = await getAssets(page);

      if (response.success) {
        const data = response.data.data.map((item) => ({
          ...item,
          TenPhong: item.phong?.TenPhong || "",
          TenDanhMuc: item.danhmuc?.TenDanhMuc || "",
        }));

        setAssets(data);
        setTotalPages(response.data.last_page);
        setCurrentPage(response.data.current_page);

        calculateStats(data);
      }
    } catch (err) {
      toast.error("Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response.success) {
        setCategories(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await getRoom();
      if (response.success) {
        setRooms(response.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const calculateStats = (assetList) => {
    const total = assetList.length;
    const good = assetList.filter((a) => a.TinhTrang === "Tốt").length;
    const maintenance = assetList.filter(
      (a) => a.TinhTrang === "Đang bảo trì",
    ).length;
    const broken = assetList.filter((a) => a.TinhTrang === "Hỏng").length;
    const totalValue = assetList.reduce(
      (sum, a) => sum + parseFloat(a.DonGia) * a.SoLuong,
      0,
    );
    setStats({ total, good, maintenance, broken, totalValue });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    setEditAsset(null);
    setEditId(null);
    setFormData({
      TenTaiSan: "",
      MaDanhMuc: "",
      MaPhong: "",
      SoLuong: "",
      DonGia: "",
      NgayNhap: "",
      TinhTrang: "Tốt",
      GhiChu: "",
    });
    setShowForm(true);
  };

  const handleEdit = (asset) => {
    setEditId(asset.MaTaiSan);
    setEditAsset(asset);
    setFormData({
      TenTaiSan: asset.TenTaiSan,
      MaDanhMuc: asset.MaDanhMuc,
      MaPhong: asset.MaPhong,
      SoLuong: asset.SoLuong,
      DonGia: asset.DonGia,
      NgayNhap: asset.NgayNhap,
      TinhTrang: asset.TinhTrang,
      GhiChu: asset.GhiChu || "",
      updated_at: asset.updated_at,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        MaDanhMuc: formData.MaDanhMuc ? Number(formData.MaDanhMuc) : null,
        MaPhong: formData.MaPhong ? Number(formData.MaPhong) : null,
        SoLuong: formData.SoLuong,
        DonGia: formData.DonGia,
        TinhTrang: formData.TinhTrang || "Tốt",
      };

      let response;

      if (editAsset) {
        response = await updateAsset(editAsset.MaTaiSan, payload);
      } else {
        response = await addAsset(payload);
      }

      if (response.success) {
        toast.success(response.message || "Thành công");
        fetchAssets();
        setShowForm(false);
      } else {
        toast.error(response.message || "Có lỗi xảy ra");
      }
    } catch (err) {
      console.log(err.response?.data);

      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;

        Object.values(errors).forEach((arr) => {
          arr.forEach((msg) => toast.error(msg));
        });
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Lỗi server");
      }
    }
  };

  const handleDelete = async (asset) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài sản này?")) {
      try {
        await deleteAsset(asset.MaTaiSan);
        toast.success("Xóa thành công");
        fetchAssets();
      } catch (err) {
        console.error(err);
        toast.error("Lỗi khi xóa");
      }
    }
  };

  const handleViewDetail = (asset) => {
    setSelectedAsset(asset);
    setShowDetail(true);
  };

  const handleMaintenance = (asset) => {
    setMaintenanceAsset(asset);
    setMaintenanceStatus(asset.TinhTrang);
    setMaintenanceNote("");
    setShowMaintenanceForm(true);
  };

  const saveMaintenance = async () => {
    try {
      await updateAsset(maintenanceAsset.MaTaiSan, {
        ...maintenanceAsset,
        TinhTrang: maintenanceStatus,
        GhiChu: maintenanceNote || maintenanceAsset.GhiChu,
      });

      toast.success("Cập nhật bảo trì thành công");
      setShowMaintenanceForm(false);
      fetchAssets();
    } catch (err) {
      console.error(err);
      toast.error("Lỗi cập nhật bảo trì");
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchAssets(page);
  };

  // =========================
  // EXPORT (placeholder) - Giống CategoryManagement
  // =========================
  const handleExportExcel = () => {
    exportExcel(
      "exportExcel/taisan",
      {MaDanhMuc: selectedCategory,
        MaPhong:selectedRoom,
        TinhTrang: selectedStatus
      },
      "taisan.xlsx"
    );
  };

  const handleExportPDF = () => {
    toast.info("Tính năng xuất PDF sẽ được phát triển sau 📄");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("vi-VN");
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Tốt":
        return "good";
      case "Đang bảo trì":
        return "maintenance";
      case "Hỏng":
        return "broken";
      default:
        return "";
    }
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      (asset.TenTaiSan || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (asset.TenDanhMuc || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (asset.TenPhong || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (asset.MaTaiSan + "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || asset.MaDanhMuc == selectedCategory;
    const matchesStatus = !selectedStatus || asset.TinhTrang === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className={`asset-management ${darkMode ? "dark" : ""}`}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={darkMode ? "dark" : "light"}
      />

      {/* Top Bar với Theme Toggle */}
      <div className="top-bar-asset">
        <div className="header-title">
          <h1>Quản Lý Tài Sản</h1>
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

      {/* Header */}
      <div className="header-section">
        <button className="btn-add" onClick={handleAdd}>
          <span>➕</span> Thêm tài sản
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon blue">📊</div>
          <div className="stat-content">
            <span className="stat-label">Tổng tài sản</span>
            <span className="stat-value">{stats.total}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✅</div>
          <div className="stat-content">
            <span className="stat-label">Đang hoạt động</span>
            <span className="stat-value">{stats.good}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">🔧</div>
          <div className="stat-content">
            <span className="stat-label">Đang bảo trì</span>
            <span className="stat-value">{stats.maintenance}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">❌</div>
          <div className="stat-content">
            <span className="stat-label">Hỏng</span>
            <span className="stat-value">{stats.broken}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">💰</div>
          <div className="stat-content">
            <span className="stat-label">Tổng giá trị</span>
            <span className="stat-value">{formatPrice(stats.totalValue)}</span>
          </div>
        </div>
      </div>

      {/* Action Bar (Search, Filter, Export) */}
      <div className="action-bar">
        <div className="search-filter-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm theo mã, tên, danh mục..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <button
            className="btn-filter"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span>🔍</span> {showFilters ? "Ẩn lọc" : "Lọc"}
          </button>

          {showFilters && (
            <div className="filter-panel">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Tất cả danh mục</option>
                {categories.map((cat) => (
                  <option key={cat.MaDanhMuc} value={cat.MaDanhMuc}>
                    {cat.TenDanhMuc}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="Tốt">Tốt</option>
                <option value="Đang bảo trì">Đang bảo trì</option>
                <option value="Hỏng">Hỏng</option>
              </select>

              <button
                className="btn-clear"
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedStatus("");
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
              >
                Xóa lọc
              </button>
            </div>
          )}
        </div>

        <div className="right-actions">
          <div className="export-group">
            <button
              className="btn-export excel"
              onClick={()=> {setShowExportModalExcel(true)}}
            >
              📊 Excel
            </button>
            <button
              className="btn-export pdf"
              onClick={handleExportPDF}
              title="Xuất PDF"
            >
              📄 PDF
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="asset-table">
          <thead>
            <tr>
              <th>Mã</th>
              <th>Tên tài sản</th>
              <th>Danh mục</th>
              <th>Phòng</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Ngày nhập</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="loading-cell">
                  <div className="spinner"></div>
                  <p>Đang tải...</p>
                </td>
              </tr>
            ) : filteredAssets.length === 0 ? (
              <tr>
                <td colSpan="9" className="empty-cell">
                  <div className="empty-state">
                    <span className="empty-icon">📦</span>
                    <h3>Không có dữ liệu</h3>
                    <button className="btn-add" onClick={handleAdd}>
                      Thêm mới
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              filteredAssets.map((asset) => (
                <tr key={asset.MaTaiSan}>
                  <td className="code">{asset.MaTaiSan}</td>
                  <td>{asset.TenTaiSan}</td>
                  <td>{asset.TenDanhMuc}</td>
                  <td>{asset.TenPhong}</td>
                  <td>{asset.SoLuong}</td>
                  <td className="price">{formatPrice(asset.DonGia)}</td>
                  <td>{formatDate(asset.NgayNhap)}</td>
                  <td>
                    <span
                      className={`status-badge ${getStatusClass(asset.TinhTrang)}`}
                    >
                      {asset.TinhTrang}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleViewDetail(asset)}
                        title="Xem chi tiết"
                      >
                        👁️
                      </button>
                      <button onClick={() => handleEdit(asset)} title="Sửa">
                        ✏️
                      </button>
                      <button onClick={() => handleDelete(asset)} title="Xóa">
                        🗑️
                      </button>
                      <button
                        onClick={() => handleMaintenance(asset)}
                        title="Bảo trì"
                      >
                        🔧
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && filteredAssets.length > 0 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ←
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            →
          </button>

          <span className="page-info">
            Trang {currentPage} / {totalPages}
          </span>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editAsset ? "✏️ Sửa tài sản" : "➕ Thêm tài sản"}</h2>
              <button
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>
                  Tên tài sản <span className="required">*</span>
                </label>
                <input
                  name="TenTaiSan"
                  value={formData.TenTaiSan}
                  onChange={handleChange}
                  placeholder="Nhập tên tài sản"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Danh mục <span className="required">*</span>
                  </label>
                  <select
                    name="MaDanhMuc"
                    value={formData.MaDanhMuc}
                    onChange={handleChange}
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((cat) => (
                      <option key={cat.MaDanhMuc} value={cat.MaDanhMuc}>
                        {cat.TenDanhMuc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Phòng <span className="required">*</span>
                  </label>
                  <select
                    name="MaPhong"
                    value={formData.MaPhong}
                    onChange={handleChange}
                  >
                    <option value="">Chọn phòng</option>
                    {rooms.map((room) => (
                      <option key={room.MaPhong} value={room.MaPhong}>
                        {room.TenPhong}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Số lượng <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    name="SoLuong"
                    value={formData.SoLuong}
                    onChange={handleChange}
                    placeholder="Nhập số lượng"
                    min="1"
                  />
                </div>

                <div className="form-group">
                  <label>
                    Đơn giá <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    name="DonGia"
                    value={formData.DonGia}
                    onChange={handleChange}
                    placeholder="Nhập đơn giá"
                    min="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Ngày nhập <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    name="NgayNhap"
                    value={formData.NgayNhap}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Tình trạng <span className="required">*</span>
                  </label>
                  <select
                    name="TinhTrang"
                    value={formData.TinhTrang}
                    onChange={handleChange}
                  >
                    <option value="Tốt">Tốt</option>
                    <option value="Đang bảo trì">Đang bảo trì</option>
                    <option value="Hỏng">Hỏng</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Ghi chú</label>
                <textarea
                  name="GhiChu"
                  value={formData.GhiChu}
                  onChange={handleChange}
                  placeholder="Nhập ghi chú"
                  rows="3"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowForm(false)}>
                Hủy
              </button>
              <button className="btn-save" onClick={handleSave}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && selectedAsset && (
        <div className="modal-overlay" onClick={() => setShowDetail(false)}>
          <div
            className="modal detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>📋 Chi tiết tài sản</h2>
              <button
                className="modal-close"
                onClick={() => setShowDetail(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-info">
                <div className="detail-row">
                  <span className="detail-label">Mã tài sản:</span>
                  <span className="detail-value code">
                    {selectedAsset.MaTaiSan}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Tên tài sản:</span>
                  <span className="detail-value">
                    {selectedAsset.TenTaiSan}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Danh mục:</span>
                  <span className="detail-value">
                    {selectedAsset.TenDanhMuc}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phòng:</span>
                  <span className="detail-value">{selectedAsset.TenPhong}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Số lượng:</span>
                  <span className="detail-value">{selectedAsset.SoLuong}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Đơn giá:</span>
                  <span className="detail-value price">
                    {formatPrice(selectedAsset.DonGia)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Thành tiền:</span>
                  <span className="detail-value total">
                    {formatPrice(
                      parseFloat(selectedAsset.DonGia) * selectedAsset.SoLuong,
                    )}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Ngày nhập:</span>
                  <span className="detail-value">
                    {formatDate(selectedAsset.NgayNhap)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Trạng thái:</span>
                  <span
                    className={`status-badge ${getStatusClass(selectedAsset.TinhTrang)}`}
                  >
                    {selectedAsset.TinhTrang}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Ghi chú:</span>
                  <span className="detail-value notes">
                    {selectedAsset.GhiChu || "Không có"}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowDetail(false)}
              >
                Đóng
              </button>
              <button
                className="btn-edit"
                onClick={() => {
                  setShowDetail(false);
                  handleEdit(selectedAsset);
                }}
              >
                Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Maintenance Modal */}
      {showMaintenanceForm && (
        <div
          className="modal-overlay"
          onClick={() => setShowMaintenanceForm(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🔧 Bảo trì tài sản</h2>
              <button
                className="modal-close"
                onClick={() => setShowMaintenanceForm(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="maintenance-info">
                <p>
                  <strong>Tên tài sản:</strong> {maintenanceAsset?.TenTaiSan}
                </p>
                <p>
                  <strong>Mã tài sản:</strong> {maintenanceAsset?.MaTaiSan}
                </p>
                <p>
                  <strong>Trạng thái hiện tại:</strong>
                  <span
                    className={`status-badge ${getStatusClass(maintenanceAsset?.TinhTrang)}`}
                  >
                    {maintenanceAsset?.TinhTrang}
                  </span>
                </p>
              </div>

              <div className="form-group">
                <label>Cập nhật trạng thái:</label>
                <select
                  value={maintenanceStatus}
                  onChange={(e) => setMaintenanceStatus(e.target.value)}
                >
                  <option value="Tốt">Tốt</option>
                  <option value="Đang bảo trì">Đang bảo trì</option>
                  <option value="Hỏng">Hỏng</option>
                </select>
              </div>

              <div className="form-group">
                <label>Ghi chú bảo trì:</label>
                <textarea
                  value={maintenanceNote}
                  onChange={(e) => setMaintenanceNote(e.target.value)}
                  placeholder="Nhập thông tin bảo trì..."
                  rows="3"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowMaintenanceForm(false)}
              >
                Hủy
              </button>
              <button className="btn-save" onClick={saveMaintenance}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {export modal excel} */}
      {showExportModalExcel && (
        <div
          className="modal-overlay"
          onClick={() => setShowExportModalExcel(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Xuất EXCEL</h2>
              <button onClick={() => setShowExportModalExcel(false)}>X</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Danh mục</label>
                <select
                  value={exportFilters.MaDanhMuc}
                  onChange={(e) =>
                    setExportFilters({
                      ...exportFilters,
                      MaDanhMuc: e.target.value,
                    })
                  }
                >
                  <option value="">Tất cả</option>
                  {categories.map((cat) => (
                    <option key={cat.MaDanhMuc} value={cat.MaDanhMuc}>
                      {cat.TenDanhMuc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Phòng</label>
                <select
                  value={exportFilters.MaPhong}
                  onChange={(e) =>
                    setExportFilters({
                      ...exportFilters,
                      MaPhong: e.target.value,
                    })
                  }
                >
                  <option value="">Tất cả</option>
                  {rooms.map((room) => (
                    <option key={room.MaPhong} value={room.MaPhong}>
                      {room.TenPhong}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Trạng thái</label>
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
                  <option value="Tốt">Tốt</option>
                  <option value="Đang bảo trì">Đang bảo trì</option>
                  <option value="Hỏng">Hỏng</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowExportModalExcel(false)}>Hủy</button>

              <button
                className="btn-save"
                onClick={() => {
                  exportExcel(
                    "exportExcel/taisan",
                    exportFilters,
                    "taisan.xlsx",
                  );
                  setShowExportModalExcel(false);
                }}
              >
                Xuất Excel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetManagement;
