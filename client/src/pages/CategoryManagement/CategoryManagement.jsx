import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CategoryManagement.css";
import {
  getCategories,
  addCategories,
  updateCategories,
  deleteCategories,
  exportExcel,
  exportPDF,
} from "../../utils/helper";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");

  const [currentCategory, setCurrentCategory] = useState({
    TenDanhMuc: "",
    MoTa: "",
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode-category');
  };

  // =========================
  // FETCH API
  // =========================
  const fetchCategories = async () => {
    const res = await getCategories();

    if (res && res.success) {
      setCategories(res.data);
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // =========================
  // EXPORT (placeholder)
  // =========================
  const handleExportExcel = () => {
    exportExcel(
      "exportExcel/danhmuc",
      {},
      "danhmuc.xlsx"
    );
  };

  const handleExportPDF = () => {
    exportPDF(
      "export/danhmuc",
      {},
      "danhsach_danhmuc.pdf"
    );
  };

  // =========================
  // SUBMIT FORM
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modalType === "add") {
      const res = await addCategories(currentCategory);

      if (res.success) {
        fetchCategories();
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } else {
      const res = await updateCategories(
        currentCategory.MaDanhMuc,
        currentCategory
      );

      if (res.success) {
        fetchCategories();
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    }

    setShowModal(false);
  };

  // =========================
  // ADD
  // =========================
  const handleAdd = () => {
    setModalType("add");
    setCurrentCategory({
      TenDanhMuc: "",
      MoTa: "",
    });
    setShowModal(true);
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (category) => {
    setModalType("edit");
    setCurrentCategory(category);
    setShowModal(true);
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    const res = await deleteCategories(categoryToDelete.MaDanhMuc);

    if (res.success) {
      fetchCategories();
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }

    setShowDeleteConfirm(false);
    setCategoryToDelete(null);
  };

  // =========================
  // INPUT
  // =========================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({
      ...currentCategory,
      [name]: value,
    });
  };

  // =========================
  // SEARCH
  // =========================
  const filteredCategories = categories.filter((category) => {
    const search = searchTerm.toLowerCase();
    return (
      category.TenDanhMuc?.toLowerCase().includes(search) ||
      String(category.MaDanhMuc).includes(search) ||
      (category.MoTa || "").toLowerCase().includes(search)
    );
  });

  // =========================
  // STATS
  // =========================
  const stats = {
    total: categories.length,
    active: categories.length,
    maintenance: 0,
    broken: 0,
  };

  return (
    <div className={`category-management-white ${darkMode ? 'dark' : ''}`}>
      {/* Top Bar với Theme Toggle */}
      <div className="top-bar-category">
        <div className="header-title">
          <h1>Quản Lý Danh Mục</h1>
        </div>
        
        <div className="top-bar-actions">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
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

      {/* STATS */}
      <div className="stats-container">
        <div className="stat-card">
          <span className="stat-label">Tổng danh mục</span>
          <span className="stat-value">{stats.total}</span>
          <span className="stat-trend">+2.5% ↑</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Đang hoạt động</span>
          <span className="stat-value">{stats.active}</span>
          <span className="stat-trend">+1.2% ↑</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Có tài sản</span>
          <span className="stat-value">{stats.maintenance}</span>
          <span className="stat-trend negative">0%</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Trống</span>
          <span className="stat-value">{stats.broken}</span>
          <span className="stat-trend negative">0%</span>
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="action-bar">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Tìm kiếm danh mục..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="right-actions">
          <div className="export-group">
            <button
              className="btn-export excel"
              onClick={handleExportExcel}
            >
              📊 Excel
            </button>

            <button
              className="btn-export pdf"
              onClick={handleExportPDF}
            >
              📄 PDF
            </button>
          </div>

          <button
            className="btn-add-white"
            onClick={handleAdd}
          >
            ➕ Thêm danh mục
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="category-table-white">
          <thead>
            <tr>
              <th>MÃ DANH MỤC</th>
              <th>TÊN DANH MỤC</th>
              <th>MÔ TẢ</th>
              <th>HÀNH ĐỘNG</th>
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
                      className="btn-icon edit"
                      onClick={() => handleEdit(category)}
                    >
                      Sửa
                    </button>

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

      <div className="table-footer">
        Tổng số danh mục: <strong>{filteredCategories.length}</strong>
      </div>

      {/* MODAL ADD EDIT */}
      {showModal && (
        <div className="modal-overlay-white">
          <div className="modal-white">
            <h2>
              {modalType === "add" ? "Thêm danh mục" : "Sửa danh mục"}
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="TenDanhMuc"
                value={currentCategory.TenDanhMuc}
                onChange={handleInputChange}
                placeholder="Tên danh mục"
                required
              />

              <textarea
                name="MoTa"
                value={currentCategory.MoTa}
                onChange={handleInputChange}
                placeholder="Mô tả"
              />

              <button type="submit">
                {modalType === "add" ? "Thêm" : "Cập nhật"}
              </button>

              <button
                type="button"
                onClick={() => setShowModal(false)}
              >
                Hủy
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteConfirm && (
        <div className="modal-overlay-white">
          <div className="modal-white">
            <h2>Xác nhận xóa</h2>
            <p>Bạn có chắc muốn xóa danh mục</p>
            <strong>{categoryToDelete?.TenDanhMuc}</strong>

            <div>
              <button onClick={() => setShowDeleteConfirm(false)}>
                Hủy
              </button>

              <button onClick={confirmDelete}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CategoryManagement;