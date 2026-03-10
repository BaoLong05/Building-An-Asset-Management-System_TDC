import React, { useState, useEffect } from "react";
import "./AssetManagement.css";

const AssetManagement = () => {
  // ========================
  // STATES
  // ========================
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  // Maintenance states
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [maintenanceAsset, setMaintenanceAsset] = useState(null);
  const [maintenanceStatus, setMaintenanceStatus] = useState("");
  const [maintenanceNote, setMaintenanceNote] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 8 sản phẩm mỗi trang

  // Mock categories
  const categories = [
    { MaDanhMuc: "DM001", TenDanhMuc: "Máy tính" },
    { MaDanhMuc: "DM002", TenDanhMuc: "Máy in" },
    { MaDanhMuc: "DM003", TenDanhMuc: "Bàn ghế" },
    { MaDanhMuc: "DM004", TenDanhMuc: "Thiết bị văn phòng" },
    { MaDanhMuc: "DM005", TenDanhMuc: "Điện thoại" },
  ];

  const rooms = [
    { MaPhong: "P001", TenPhong: "Phòng Hội thảo" },
    { MaPhong: "P002", TenPhong: "Phòng 101" },
    { MaPhong: "P003", TenPhong: "Phòng 102" },
  ];

  const [formData, setFormData] = useState({
    MaTaiSan: "",
    TenTaiSan: "",
    MaDanhMuc: "",
    MaPhong: "",
    SoLuong: "",
    DonGia: "",
    NgayNhap: "",
    TinhTrang: "Tốt",
    GhiChu: "",
  });

  // Mock data - 8 sản phẩm
  useEffect(() => {
    setTimeout(() => {
      const mockAssets = [
        {
          id: "TS001",
          code: "TS001",
          name: "Máy tính Dell XPS 15",
          category: "DM001",
          categoryName: "Máy tính",
          room: "P001",
          roomName: "Phòng Hội thảo",
          quantity: 5,
          price: 15000000,
          purchaseDate: "2024-01-15",
          status: "Tốt",
          notes: "Cấu hình cao, dùng cho thiết kế",
          maintenanceHistory: [
            { ngay: "2024-02-15", trangThai: "Bảo trì", ghiChu: "Vệ sinh định kỳ" },
          ],
        },
        {
          id: "TS002",
          code: "TS002",
          name: "Máy in HP LaserJet Pro",
          category: "DM002",
          categoryName: "Máy in",
          room: "P002",
          roomName: "Phòng 101",
          quantity: 2,
          price: 4500000,
          purchaseDate: "2024-02-20",
          status: "Đang bảo trì",
          notes: "Cần thay mực",
          maintenanceHistory: [
            { ngay: "2024-03-01", trangThai: "Đang bảo trì", ghiChu: "Thay mực" },
          ],
        },
        {
          id: "TS003",
          code: "TS003",
          name: "Bàn làm việc",
          category: "DM003",
          categoryName: "Bàn ghế",
          room: "P003",
          roomName: "Phòng 102",
          quantity: 10,
          price: 1200000,
          purchaseDate: "2023-12-10",
          status: "Tốt",
          notes: "Bàn màu trắng",
          maintenanceHistory: [],
        },
        {
          id: "TS004",
          code: "TS004",
          name: "Điện thoại Panasonic",
          category: "DM005",
          categoryName: "Điện thoại",
          room: "P001",
          roomName: "Phòng Hội thảo",
          quantity: 3,
          price: 850000,
          purchaseDate: "2024-01-05",
          status: "Hỏng",
          notes: "Hỏng loa",
          maintenanceHistory: [
            { ngay: "2024-02-10", trangThai: "Hỏng", ghiChu: "Loa không hoạt động" },
          ],
        },
        {
          id: "TS005",
          code: "TS005",
          name: "Máy chiếu Epson",
          category: "DM004",
          categoryName: "Thiết bị văn phòng",
          room: "P002",
          roomName: "Phòng 101",
          quantity: 1,
          price: 12000000,
          purchaseDate: "2023-11-20",
          status: "Tốt",
          notes: "Độ phân giải Full HD",
          maintenanceHistory: [],
        },
        {
          id: "TS006",
          code: "TS006",
          name: "Máy tính iMac 24",
          category: "DM001",
          categoryName: "Máy tính",
          room: "P003",
          roomName: "Phòng 102",
          quantity: 3,
          price: 32000000,
          purchaseDate: "2024-03-01",
          status: "Tốt",
          notes: "Chip M1",
          maintenanceHistory: [],
        },
        {
          id: "TS007",
          code: "TS007",
          name: "Ghế xoay văn phòng",
          category: "DM003",
          categoryName: "Bàn ghế",
          room: "P001",
          roomName: "Phòng Hội thảo",
          quantity: 15,
          price: 1500000,
          purchaseDate: "2023-09-10",
          status: "Đang bảo trì",
          notes: "Cần thay bánh xe",
          maintenanceHistory: [
            { ngay: "2024-02-28", trangThai: "Đang bảo trì", ghiChu: "Thay bánh xe" },
          ],
        },
        {
          id: "TS008",
          code: "TS008",
          name: "Máy in Canon",
          category: "DM002",
          categoryName: "Máy in",
          room: "P002",
          roomName: "Phòng 101",
          quantity: 2,
          price: 3800000,
          purchaseDate: "2024-01-20",
          status: "Tốt",
          notes: "Máy in màu",
          maintenanceHistory: [],
        },
      ];
      setAssets(mockAssets);
      setLoading(false);
    }, 1000);
  }, []);

  // ========================
  // FILTERS & SEARCH
  // ========================
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      searchTerm === "" ||
      asset.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.code?.toString().includes(searchTerm) ||
      asset.categoryName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "" || asset.category === selectedCategory;
    const matchesStatus = selectedStatus === "" || asset.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAssets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);

  // ========================
  // STATS
  // ========================
  const stats = {
    total: assets.length,
    good: assets.filter((a) => a.status === "Tốt").length,
    maintenance: assets.filter((a) => a.status === "Đang bảo trì").length,
    broken: assets.filter((a) => a.status === "Hỏng").length,
    totalValue: assets.reduce((sum, asset) => sum + asset.price * asset.quantity, 0),
  };

  // ========================
  // UTILITIES
  // ========================
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("vi-VN");
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Tốt": return "good";
      case "Đang bảo trì": return "maintenance";
      case "Hỏng": return "broken";
      default: return "";
    }
  };

  // ========================
  // HANDLERS
  // ========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      MaTaiSan: "",
      TenTaiSan: "",
      MaDanhMuc: "",
      MaPhong: "",
      SoLuong: "",
      DonGia: "",
      NgayNhap: "",
      TinhTrang: "Tốt",
      GhiChu: "",
    });
    setEditingAsset(null);
  };

  const handleAdd = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setFormData({
      MaTaiSan: asset.code,
      TenTaiSan: asset.name,
      MaDanhMuc: asset.category,
      MaPhong: asset.room,
      SoLuong: asset.quantity,
      DonGia: asset.price,
      NgayNhap: asset.purchaseDate,
      TinhTrang: asset.status,
      GhiChu: asset.notes,
    });
    setShowForm(true);
  };

  const handleViewDetail = (asset) => {
    setSelectedAsset(asset);
    setShowDetail(true);
  };

  const handleSave = () => {
    setShowForm(false);
    resetForm();
    alert(editingAsset ? "✅ Cập nhật thành công!" : "✅ Thêm thành công!");
  };

  const handleDelete = (asset) => {
    if (window.confirm(`⚠️ Xóa tài sản "${asset.name}"?`)) {
      alert("🗑️ Xóa thành công!");
    }
  };

  const handleMaintenance = (asset) => {
    setMaintenanceAsset(asset);
    setMaintenanceStatus(asset.status);
    setMaintenanceNote("");
    setShowMaintenanceForm(true);
  };

  const saveMaintenance = () => {
    alert("🔧 Cập nhật bảo trì thành công!");
    setShowMaintenanceForm(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="asset-management">
      {/* Header */}
      <div className="header-section">
        <h1>
          <span className="header-icon">📦</span>
          Quản Lý Tài Sản
        </h1>
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

      {/* Search & Filter */}
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

        <button className="btn-filter" onClick={() => setShowFilters(!showFilters)}>
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
              }}
            >
              Xóa lọc
            </button>
          </div>
        )}
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
            ) : currentItems.length === 0 ? (
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
              currentItems.map((asset) => (
                <tr key={asset.id}>
                  <td className="code">{asset.code}</td>
                  <td>{asset.name}</td>
                  <td>{asset.categoryName}</td>
                  <td>{asset.roomName}</td>
                  <td>{asset.quantity}</td>
                  <td className="price">{formatPrice(asset.price)}</td>
                  <td>{formatDate(asset.purchaseDate)}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-view" onClick={() => handleViewDetail(asset)}>👁️</button>
                      <button className="btn-edit" onClick={() => handleEdit(asset)}>✏️</button>
                      <button className="btn-delete" onClick={() => handleDelete(asset)}>🗑️</button>
                      <button className="btn-maintenance" onClick={() => handleMaintenance(asset)}>🔧</button>
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
            {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredAssets.length)} / {filteredAssets.length}
          </span>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingAsset ? "✏️ Sửa tài sản" : "➕ Thêm tài sản"}</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Mã tài sản <span className="required">*</span></label>
                <input
                  name="MaTaiSan"
                  value={formData.MaTaiSan}
                  onChange={handleChange}
                  disabled={editingAsset}
                  placeholder="Nhập mã tài sản"
                />
              </div>

              <div className="form-group">
                <label>Tên tài sản <span className="required">*</span></label>
                <input
                  name="TenTaiSan"
                  value={formData.TenTaiSan}
                  onChange={handleChange}
                  placeholder="Nhập tên tài sản"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Danh mục <span className="required">*</span></label>
                  <select name="MaDanhMuc" value={formData.MaDanhMuc} onChange={handleChange}>
                    <option value="">Chọn danh mục</option>
                    {categories.map(cat => (
                      <option key={cat.MaDanhMuc} value={cat.MaDanhMuc}>{cat.TenDanhMuc}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Phòng <span className="required">*</span></label>
                  <select name="MaPhong" value={formData.MaPhong} onChange={handleChange}>
                    <option value="">Chọn phòng</option>
                    {rooms.map(room => (
                      <option key={room.MaPhong} value={room.MaPhong}>{room.TenPhong}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Số lượng <span className="required">*</span></label>
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
                  <label>Đơn giá <span className="required">*</span></label>
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
                  <label>Ngày nhập <span className="required">*</span></label>
                  <input
                    type="date"
                    name="NgayNhap"
                    value={formData.NgayNhap}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Tình trạng <span className="required">*</span></label>
                  <select name="TinhTrang" value={formData.TinhTrang} onChange={handleChange}>
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
              <button className="btn-cancel" onClick={() => setShowForm(false)}>Hủy</button>
              <button className="btn-save" onClick={handleSave}>Lưu</button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && selectedAsset && (
        <div className="modal-overlay" onClick={() => setShowDetail(false)}>
          <div className="modal detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📋 Chi tiết tài sản</h2>
              <button className="modal-close" onClick={() => setShowDetail(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="detail-info">
                <div className="detail-row">
                  <span className="detail-label">Mã tài sản:</span>
                  <span className="detail-value code">{selectedAsset.code}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Tên tài sản:</span>
                  <span className="detail-value">{selectedAsset.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Danh mục:</span>
                  <span className="detail-value">{selectedAsset.categoryName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phòng:</span>
                  <span className="detail-value">{selectedAsset.roomName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Số lượng:</span>
                  <span className="detail-value">{selectedAsset.quantity}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Đơn giá:</span>
                  <span className="detail-value price">{formatPrice(selectedAsset.price)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Thành tiền:</span>
                  <span className="detail-value total">
                    {formatPrice(selectedAsset.price * selectedAsset.quantity)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Ngày nhập:</span>
                  <span className="detail-value">{formatDate(selectedAsset.purchaseDate)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Trạng thái:</span>
                  <span className={`status-badge ${getStatusClass(selectedAsset.status)}`}>
                    {selectedAsset.status}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Ghi chú:</span>
                  <span className="detail-value notes">{selectedAsset.notes || "Không có"}</span>
                </div>
                
                {selectedAsset.maintenanceHistory?.length > 0 && (
                  <div className="history-section">
                    <h3>Lịch sử bảo trì</h3>
                    {selectedAsset.maintenanceHistory.map((item, index) => (
                      <div key={index} className="history-item">
                        <span className="history-date">📅 {formatDate(item.ngay)}</span>
                        <span className={`status-badge small ${getStatusClass(item.trangThai)}`}>
                          {item.trangThai}
                        </span>
                        <span className="history-note">📝 {item.ghiChu}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowDetail(false)}>Đóng</button>
              <button className="btn-edit" onClick={() => {
                setShowDetail(false);
                handleEdit(selectedAsset);
              }}>Chỉnh sửa</button>
            </div>
          </div>
        </div>
      )}

      {/* Maintenance Modal */}
      {showMaintenanceForm && (
        <div className="modal-overlay" onClick={() => setShowMaintenanceForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🔧 Bảo trì tài sản</h2>
              <button className="modal-close" onClick={() => setShowMaintenanceForm(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="maintenance-info">
                <p><strong>Tên tài sản:</strong> {maintenanceAsset?.name}</p>
                <p><strong>Mã tài sản:</strong> {maintenanceAsset?.code}</p>
                <p><strong>Trạng thái hiện tại:</strong> 
                  <span className={`status-badge ${getStatusClass(maintenanceAsset?.status)}`}>
                    {maintenanceAsset?.status}
                  </span>
                </p>
              </div>

              <div className="form-group">
                <label>Cập nhật trạng thái:</label>
                <select value={maintenanceStatus} onChange={(e) => setMaintenanceStatus(e.target.value)}>
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
              <button className="btn-cancel" onClick={() => setShowMaintenanceForm(false)}>Hủy</button>
              <button className="btn-save" onClick={saveMaintenance}>Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetManagement;