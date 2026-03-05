 import React, { useState, useEffect } from "react";
import "./AssetManagement.css";
import {
  getAssets,
  addAsset,
  updateAsset,
  deleteAsset,
  toggleMaintenance
} from "../../utils/helper";

const AssetManagement = () => {

  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);

  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [maintenanceAsset, setMaintenanceAsset] = useState(null);
  const [maintenanceStatus, setMaintenanceStatus] = useState("");

  const [formData, setFormData] = useState({
    MaTaiSan: "",
    TenTaiSan: "",
    MaDanhMuc: "",
    MaPhong: "",
    SoLuong: "",
    DonGia: "",
    NgayNhap: "",
    TinhTrang: "Tốt",
    GhiChu: ""
  });

  // ========================
  // LOAD DATA
  // ========================

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {

    setLoading(true);

    const data = await getAssets();

    const formatted = data.map((item) => ({
      id: item.MaTaiSan,
      code: item.MaTaiSan,
      name: item.TenTaiSan,
      category: item.MaDanhMuc,
      room: item.MaPhong,
      quantity: item.SoLuong,
      price: item.DonGia,
      purchaseDate: item.NgayNhap,
      status: item.TinhTrang,
      notes: item.GhiChu
    }));

    setAssets(formatted);
    setLoading(false);
  };

  // ========================
  // SEARCH
  // ========================

  const filteredAssets = assets.filter(asset =>
    asset.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.code?.toString().includes(searchTerm)
  );

  // ========================
  // FORM CHANGE
  // ========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  // ========================
  // ADD
  // ========================

  const handleAdd = () => {

    setEditingAsset(null);

    setFormData({
      MaTaiSan: "",
      TenTaiSan: "",
      MaDanhMuc: "",
      MaPhong: "",
      SoLuong: "",
      DonGia: "",
      NgayNhap: "",
      TinhTrang: "Tốt",
      GhiChu: ""
    });

    setShowForm(true);
  };

  // ========================
  // EDIT
  // ========================

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
      GhiChu: asset.notes
    });

    setShowForm(true);
  };

  // ========================
  // SAVE
  // ========================

  const handleSave = async () => {

    if (editingAsset) {

      await updateAsset(editingAsset.id, formData);

    } else {

      await addAsset(formData);

    }

    setShowForm(false);

    fetchAssets();
  };

  // ========================
  // DELETE
  // ========================

  const handleDelete = async (asset) => {

    if (window.confirm("Bạn có chắc muốn xóa?")) {

      await deleteAsset(asset.id);

      fetchAssets();

    }

  };

  // ========================
  // MAINTENANCE
  // ========================

  const handleMaintenance = (asset) => {

    setMaintenanceAsset(asset);
    setMaintenanceStatus(asset.status);
    setShowMaintenanceForm(true);

  };

  const saveMaintenance = async () => {

    await toggleMaintenance(maintenanceAsset.id, maintenanceStatus);

    setShowMaintenanceForm(false);

    fetchAssets();

  };

  // ========================
  // FORMAT PRICE
  // ========================

  const formatPrice = (price) => {

    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(price);

  };

  // ========================
  // UI
  // ========================

  return (
    <div className="asset-management">

      <h1> QUẢN LÝ TÀI SẢN</h1>

      <button className="btn-add" onClick={handleAdd}>
        ➕ Thêm tài sản
      </button>

      <div className="search-section">
  <div className="search-box">
    <span className="search-icon">🔍</span>
    <input
      type="text"
      placeholder="Tìm kiếm tài sản..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
</div>

      <table className="asset-table">

        <thead>
          <tr>
            <th>Mã</th>
            <th>Tên</th>
            <th>Danh mục</th>
            <th>Phòng</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Ngày nhập</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>

          {loading ? (

            <tr>
              <td colSpan="9">Đang tải...</td>
            </tr>

          ) : (

            filteredAssets.map(asset => (

              <tr key={asset.id}>

                <td>{asset.code}</td>
                <td>{asset.name}</td>
                <td>{asset.category}</td>
                <td>{asset.room}</td>
                <td>{asset.quantity}</td>
                <td>{formatPrice(asset.price)}</td>
                <td>{asset.purchaseDate}</td>
                <td>{asset.status}</td>

                <td>

                  <button onClick={() => handleEdit(asset)}>✏️</button>

                  <button onClick={() => handleDelete(asset)}>🗑️</button>

                  <button onClick={() => handleMaintenance(asset)}>🔧</button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      {/* ================= FORM ADD EDIT ================= */}

      {showForm && (

        <div className="modal">

          <div className="modal-content">

            <h2>{editingAsset ? "Sửa tài sản" : "Thêm tài sản"}</h2>

            <input name="MaTaiSan" value={formData.MaTaiSan} disabled={editingAsset} onChange={handleChange} placeholder="Mã tài sản" />

            <input name="TenTaiSan" value={formData.TenTaiSan} onChange={handleChange} placeholder="Tên tài sản" />

            <input name="MaDanhMuc" value={formData.MaDanhMuc} onChange={handleChange} placeholder="Mã danh mục" />

            <input name="MaPhong" value={formData.MaPhong} onChange={handleChange} placeholder="Mã phòng" />

            <input name="SoLuong" value={formData.SoLuong} onChange={handleChange} placeholder="Số lượng" />

            <input name="DonGia" value={formData.DonGia} onChange={handleChange} placeholder="Đơn giá" />

            <input type="date" name="NgayNhap" value={formData.NgayNhap} onChange={handleChange} />

            <select name="TinhTrang" value={formData.TinhTrang} onChange={handleChange}>
              <option value="Tốt">Tốt</option>
              <option value="Đang bảo trì">Đang bảo trì</option>
              <option value="Hỏng">Hỏng</option>
            </select>

            <textarea name="GhiChu" value={formData.GhiChu} onChange={handleChange} placeholder="Ghi chú"></textarea>

            <button onClick={handleSave}>💾 Lưu</button>

            <button onClick={() => setShowForm(false)}>❌ Hủy</button>

          </div>

        </div>

      )}

      {/* ================= FORM MAINTENANCE ================= */}

      {showMaintenanceForm && (

        <div className="modal">

          <div className="modal-content">

            <h2>🔧 Bảo trì tài sản</h2>

            <p>{maintenanceAsset?.name}</p>

            <select value={maintenanceStatus} onChange={(e) => setMaintenanceStatus(e.target.value)}>

              <option value="Tốt">Tốt</option>
              <option value="Đang bảo trì">Đang bảo trì</option>
              <option value="Hỏng">Hỏng</option>

            </select>

            <button onClick={saveMaintenance}>💾 Lưu</button>

            <button onClick={() => setShowMaintenanceForm(false)}>❌ Hủy</button>

          </div>

        </div>

      )}

    </div>
  );
};

export default AssetManagement;