import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RoomManagement.css";
import {
  getRoom,
  addRoom,
  updateRoom,
  deleteRoom,
  getAssetRoom,
  exportExcel,
  exportPDF,

} from "../../utils/helper";

const RoomManagement = () => {
    document.title = "Vị Trí Sử Dụng"
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [currentRoom, setCurrentRoom] = useState({
    TenPhong: "",
    ViTri: "",
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  const [assets, setAssets] = useState([]);
  const [assetPage, setAssetPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [roomPage, setRoomPage] = useState(1);
  const [roomLastPage, setRoomLastPage] = useState(1);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode-room");
  };

  // =========================
  // FETCH API
  // =========================
  const fetchRooms = async (page = 1) => {
    const res = await getRoom(page);

    if (res && res.success) {
      setRooms(res.data.data);
      setRoomPage(res.data.current_page);
    setRoomLastPage(res.data.last_page);
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    fetchRooms(1);
  }, []);


  //doi trang
  const changeRoomPage = (page) => {
  if (page < 1 || page > roomLastPage) return;
  fetchRooms(page);
};
  // =========================
  // EXPORT (placeholder)
  // =========================
  const handleExportExcel = () => {
    exportExcel(
      "exportExcel/phong",
      {},
      "phong.xlsx"
    );
  };

  const handleExportPDF = () => {
    exportPDF(
      "export/phong",
      {},
      "danhsach_phong.pdf"
    );
  };

  // =========================
  // SUBMIT FORM
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modalType === "add") {
      const res = await addRoom(currentRoom);

      if (res.success) {
        fetchRooms();
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } else {
      const res = await updateRoom(currentRoom.MaPhong, currentRoom);

      if (res.success) {
        fetchRooms();
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
    setCurrentRoom({
      TenPhong: "",
      ViTri: "",
    });
    setShowModal(true);
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (room) => {
    setModalType("edit");
    setCurrentRoom(room);
    setShowModal(true);
  };

  // =========================
  // VIEW DETAILS
  // =========================
  const handleViewDetails = async (room) => {
    setSelectedRoom(room);
    setShowDetailModal(true);

    const res = await getAssetRoom(room.MaPhong, 1);
    if (res.success) {
      setAssets(res.data.data);
      setAssetPage(res.data.current_page);
      setLastPage(res.data.last_page);
    } else {
      toast.error(res.message);
    }
  };

  //doi trang
  const ChangeAssetPage = async (page) => {
    const res = await getAssetRoom(selectedRoom.MaPhong, page);

    if (res.success) {
      setAssets(res.data.data);
      setAssetPage(res.data.current_page);
      setLastPage(res.data.last_page);
    }
  };
  // =========================
  // DELETE
  // =========================
  const handleDelete = (room) => {
    setRoomToDelete(room);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    const res = await deleteRoom(roomToDelete.MaPhong);

    if (res.success) {
      fetchRooms();
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }

    setShowDeleteConfirm(false);
    setRoomToDelete(null);
  };

  // =========================
  // INPUT
  // =========================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRoom({
      ...currentRoom,
      [name]: value,
    });
  };

  // =========================
  // SEARCH
  // =========================
  const filteredRooms = rooms.filter((room) => {
    const search = searchTerm.toLowerCase();
    return (
      room.TenPhong?.toLowerCase().includes(search) ||
      String(room.MaPhong).includes(search) ||
      (room.ViTri || "").toLowerCase().includes(search)
    );
  });

  return (
    <div className={`room-management ${darkMode ? "dark" : ""}`}>
      {/* Top Bar với Theme Toggle */}
      <div className="top-bar-room">
        <div className="header-title">
          <h1>Vị trí sử dụng</h1>
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
            placeholder="🔍 Tìm kiếm vị trí..."
            maxLength={255}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="right-actions">
          <div className="export-group">
            <button className="btn-export excel" onClick={handleExportExcel}>
              📊 Excel
            </button>

            <button className="btn-export pdf" onClick={handleExportPDF}>
              📄 PDF
            </button>
          </div>

          <button className="btn-add-room" onClick={handleAdd}>
            ➕ Thêm vị trí
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="room-table">
          <thead>
            <tr>
              <th>MÃ PHÒNG</th>
              <th>TÊN PHÒNG</th>
              <th>VỊ TRÍ</th>
              <th>HÀNH ĐỘNG</th>
            </tr>
          </thead>

          <tbody>
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <tr key={room.MaPhong}>
                  <td>
                    <span className="code-badge">{room.MaPhong}</span>
                  </td>
                  <td>
                    <div className="room-name">
                      <i className="fas fa-door-open"></i>
                      {room.TenPhong}
                    </div>
                  </td>
                  <td>
                    <div className="description">
                      {room.ViTri || "Chưa có vị trí"}
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon view"
                        onClick={() => handleViewDetails(room)}
                        title="Xem chi tiết"
                      >
                        <i className="fas fa-eye"></i>
                        Chi tiết
                      </button>
                      <button
                        className="btn-icon edit"
                        onClick={() => handleEdit(room)}
                        title="Sửa"
                      >
                        <i className="fas fa-edit"></i>
                        Sửa
                      </button>
                      <button
                        className="btn-icon delete"
                        onClick={() => handleDelete(room)}
                        title="Xóa"
                      >
                        <i className="fas fa-trash-alt"></i>
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="no-data">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            disabled={roomPage === 1}
            onClick={() => changeRoomPage(roomPage - 1)}
          >
            Quay Lại
          </button>

          <span>
            {" "}
            Trang {roomPage}/ {roomLastPage}
          </span>

          <button
            disabled={roomPage === roomLastPage}
            onClick={() => changeRoomPage(roomPage + 1)}
          >
            Tiếp Theo
          </button>
        </div>
      </div>

      <div className="table-footer">
        Tổng số vị trí: <strong>{rooms.length}</strong>
      </div>

      {/* MODAL ADD EDIT */}
      {showModal && (
        <div className="modal-overlay-room">
          <div className="modal-room">
            <h2>{modalType === "add" ? "Thêm vị trí" : "Sửa vị trí"}</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="TenPhong"
                value={currentRoom.TenPhong}
                onChange={handleInputChange}
                placeholder="Tên vị trí"
                required
              />

              <textarea
                name="ViTri"
                value={currentRoom.ViTri}
                onChange={handleInputChange}
                placeholder="Vị trí"
              />

              <button type="submit">
                {modalType === "add" ? "Thêm" : "Cập nhật"}
              </button>

              <button type="button" onClick={() => setShowModal(false)}>
                Hủy
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {showDetailModal && selectedRoom && (
        <div className="modal-overlay-room">
          <div className="modal-room detail-modal">
            <div className="detail-header">
              <h2>
                <i className="fas fa-info-circle"></i>
                Chi tiết vị trí
              </h2>
            </div>

            <div className="detail-table-container">
              <table className="detail-info-table">
                <thead>
                  <tr>
                    <th>Mã tài sản</th>
                    <th>Tên tài sản</th>
                    <th>Số lượng</th>
                    <th>Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.length > 0 ? (
                    assets.map((asset) => (
                      <tr key={asset.MaTaiSan}>
                        <td>{asset.MaTaiSan}</td>
                        <td>{asset.TenTaiSan}</td>
                        <td>{asset.SoLuong}</td>
                        <td>{asset.TrangThai}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>Không Có Tài Sản</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="pagination">
                <button
                  disabled={assetPage === 1}
                  onClick={() => ChangeAssetPage(assetPage - 1)}
                >
                  Quay Lại
                </button>

                <span>
                  Trang {assetPage} /{lastPage}
                </span>

                <button
                  disabled={assetPage === lastPage}
                  onClick={() => ChangeAssetPage(assetPage + 1)}
                >
                  Tiếp Theo
                </button>
              </div>
            </div>

            <div className="detail-actions">
              <button
                className="btn-close-detail"
                onClick={() => setShowDetailModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteConfirm && (
        <div className="modal-overlay-room">
          <div className="modal-room">
            <h2>Xác nhận xóa</h2>
            <p>Bạn có chắc muốn xóa vị trí</p>
            <strong>{roomToDelete?.TenPhong}</strong>

            <div>
              <button onClick={() => setShowDeleteConfirm(false)}>Hủy</button>

              <button onClick={confirmDelete}>Xóa</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default RoomManagement;
