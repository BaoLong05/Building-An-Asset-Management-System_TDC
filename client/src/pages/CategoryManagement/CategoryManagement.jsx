import React, { useState, useEffect } from "react";
import "./CategoryManagement.css";
import { getCategories } from "../../utils/helper";

const CategoryManagement = () => {
  // State quản lý danh sách danh mục
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    TenDanhMuc: "",
    MoTa: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [modalType, setModalType] = useState("add");

  // Mock data
  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  // Thống kê
  const stats = {
    total: categories.length,
    active: categories.length - 2, // Giả lập
    maintenance: 2, // Giả lập
    broken: 0, // Giả lập
  };

  // Lọc danh mục
  const filteredCategories = categories.filter(
    (category) =>
      category.TenDanhMuc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.MaDanhMuc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.MoTa.toLowerCase().includes(searchTerm.toLowerCase()),
  );


  const handleAdd = () => {
    setModalType("add");
    setCurrentCategory({
      MaDanhMuc: "",
      TenDanhMuc: "",
      MoTa: "",
    });
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setModalType("edit");
    setCurrentCategory(category);
    setShowModal(true);
  };

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setCategories(
      categories.filter((c) => c.MaDanhMuc !== categoryToDelete.MaDanhMuc),
    );
    setShowDeleteConfirm(false);
    setCategoryToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalType === "add") {
      const newCategory = {
        ...currentCategory,
        MaDanhMuc: `DM${String(categories.length + 1).padStart(3, "0")}`,
      };
      setCategories([...categories, newCategory]);
    } else {
      setCategories(
        categories.map((c) =>
          c.MaDanhMuc === currentCategory.MaDanhMuc ? currentCategory : c,
        ),
      );
    }

    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({
      ...currentCategory,
      [name]: value,
    });
  };

  return (
    <div className="category-management-white">
      {/* Header với title */}
      <div className="header-title">
        <h1>Quản Lý Danh Mục</h1>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Tổng danh mục</span>
            <span className="stat-value">{stats.total}</span>
          </div>
          <div className="stat-icon blue">
            <i className="fas fa-folder"></i>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Đang hoạt động</span>
            <span className="stat-value">{stats.active}</span>
          </div>
          <div className="stat-icon green">
            <i className="fas fa-check-circle"></i>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Có tài sản</span>
            <span className="stat-value">{stats.maintenance}</span>
          </div>
          <div className="stat-icon orange">
            <i className="fas fa-box"></i>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Trống</span>
            <span className="stat-value">{stats.broken}</span>
          </div>
          <div className="stat-icon red">
            <i className="fas fa-empty-set"></i>
          </div>
        </div>
      </div>

      {/* Search và Add Button */}
      <div className="action-bar">
        <div className="search-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm theo mã, tên danh mục, mô tả..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-add-white" onClick={handleAdd}>
          <i className="fas fa-plus"></i>
          Thêm danh mục
        </button>
      </div>

      {/* Bảng danh sách */}
      <div className="table-wrapper">
        <table className="category-table-white">
          <thead>
            <tr>
              <th>MÃ DANH MỤC</th>
              <th>TÊN DANH MỤC</th>
              <th>MÔ TẢ</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr key={category.MaDanhMuc}>
                  <td>{category.MaDanhMuc}</td>
                  <td>{category.TenDanhMuc}</td>
                  <td>{category.MoTa}</td>
                  <td>
                    <button
                      className="btn-icon delete"
                      onClick={() => handleDelete(category)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer với tổng giá trị */}
      <div className="table-footer">
        <div className="total-assets">
          <i className="fas fa-cubes"></i>
          <span>
            Tổng số danh mục: <strong>{filteredCategories.length}</strong>
          </span>
        </div>
        <div className="total-value">
          <i className="fas fa-chart-line"></i>
          <span>
            Tổng tài sản: <strong>1.247</strong>
          </span>
        </div>
      </div>

      {/* Modal thêm/sửa */}
      {showModal && (
        <div className="modal-overlay-white">
          <div className="modal-white">
            <div className="modal-header-white">
              <h2>
                {modalType === "add" ? "Thêm danh mục mới" : "Sửa danh mục"}
              </h2>
              <button
                className="close-btn-white"
                onClick={() => setShowModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group-white">
                <label htmlFor="TenDanhMuc">
                  Tên danh mục <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="TenDanhMuc"
                  name="TenDanhMuc"
                  value={currentCategory.TenDanhMuc}
                  onChange={handleInputChange}
                  required
                  placeholder="Nhập tên danh mục"
                />
              </div>
              <div className="form-group-white">
                <label htmlFor="MoTa">Mô tả</label>
                <textarea
                  id="MoTa"
                  name="MoTa"
                  value={currentCategory.MoTa}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Nhập mô tả chi tiết về danh mục"
                />
              </div>
              <div className="modal-footer-white">
                <button
                  type="button"
                  className="btn-cancel-white"
                  onClick={() => setShowModal(false)}
                >
                  Hủy bỏ
                </button>
                <button type="submit" className="btn-save-white">
                  {modalType === "add" ? "Thêm mới" : "Cập nhật"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal xác nhận xóa */}
      {showDeleteConfirm && (
        <div className="modal-overlay-white">
          <div className="modal-white confirm-modal-white">
            <div className="modal-header-white">
              <h2>Xác nhận xóa</h2>
              <button
                className="close-btn-white"
                onClick={() => setShowDeleteConfirm(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="confirm-content-white">
              <i className="fas fa-exclamation-triangle warning-icon-white"></i>
              <p>Bạn có chắc chắn muốn xóa danh mục</p>
              <p className="category-name-white">
                "{categoryToDelete?.TenDanhMuc}"?
              </p>
              <p className="warning-text-white">
                Hành động này không thể hoàn tác!
              </p>
            </div>
            <div className="modal-footer-white">
              <button
                className="btn-cancel-white"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Hủy bỏ
              </button>
              <button className="btn-delete-white" onClick={confirmDelete}>
                Xóa danh mục
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
