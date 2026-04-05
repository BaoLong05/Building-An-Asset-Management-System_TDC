import React, { useState, useEffect } from "react";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Notification.css";
import { getMyTask, Readed, readed_All } from "../../utils/helper";

const Notification = () => {
  document.title = "Thông báo hệ thống";

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("notificationDarkMode");
    if (savedTheme === "true") setDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("notificationDarkMode", !darkMode);
  };

  const fetchNotifications = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await getMyTask();

      if (res.data) {
        const format = res.data.map((item) => ({
          id: item.MaBaoTri,
          title: "Yêu cầu bảo trì!",
          message: `Tài sản ${item.taisan?.TenTaiSan} cần bảo trì!`,
          type: "Warning",
          is_read: item.is_read,
          created_at: item.NgayBaoTri,
        }));
        setNotifications(format);
        setTotal(format.length);

        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(res.message || "Không thể tải thông báo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications(1);
  }, []);

  // 👉 Đánh dấu một thông báo là đã đọc
  const handleMarkAsRead = async (id) => {
    try {
      const res = await Readed(id);
      if (res.data.success) {
        setNotifications((prev) => {
          prev.map((n) => (n.id === id ? { ...n, is_read: true } : n));
        });
        toast.success("Đã đánh dấu đã đọc");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  // 👉 Xóa một thông báo
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa thông báo này?")) return;
    try {
      // Gọi API delete notification
      // const res = await deleteNotification(id);
      // if (res.success) {
      //   setNotifications(prev => prev.filter(n => n.id !== id));
      //   toast.success("Xóa thành công");
      // } else toast.error(res.message);

      setNotifications((prev) => prev.filter((n) => n.id !== id));
      toast.success("Xóa thành công");
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };

  // 👉 Đánh dấu tất cả đã đọc
  const markAllAsRead = async () => {
    try {
      const res = await readed_All();
      if (res.data.success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
        toast.success("Đã đánh dấu tất cả là đã đọc");
      }
    } catch (error) {
      toast.error("Thao tác thất bại");
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("vi-VN");
  };

  return (
    <div className={`notification-page ${darkMode ? "dark" : ""}`}>
    
      <div className="notification-header">
        <h1>
          <i className="fas fa-bell"></i> Thông báo hệ thống
        </h1>
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button className="mark-all-btn" onClick={markAllAsRead}>
            Đánh dấu tất cả đã đọc
          </button>
        </div>
      </div>

      <div className="notification-stats">
        <span>
          Tổng số: <strong>{total}</strong> thông báo
        </span>
        <span>
          Chưa đọc:{" "}
          <strong>{notifications.filter((n) => !n.is_read).length}</strong>
        </span>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải thông báo...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="empty-notification">
          <i className="fas fa-inbox"></i>
          <p>Không có thông báo nào.</p>
        </div>
      ) : (
        <>
          <div className="notification-list">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`notification-item ${!notif.is_read ? "unread" : ""}`}
              >
                <div className="notification-icon">
                  {getTypeIcon(notif.type)}
                </div>
                <div className="notification-content">
                  <div className="notification-title">{notif.title}</div>
                  <div className="notification-message">{notif.message}</div>
                  <div className="notification-time">
                    <i className="far fa-clock"></i>{" "}
                    {formatDate(notif.created_at)}
                  </div>
                </div>
                <div className="notification-actions">
                  {!notif.is_read && (
                    <button
                      className="btn-read"
                      onClick={() => handleMarkAsRead(notif.id)}
                      title="Đánh dấu đã đọc"
                    >
                      ✓
                    </button>
                  )}
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(notif.id)}
                    title="Xóa"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Phân trang */}
          <div className="pagination">
            <button
              className="page-btn"
              disabled={page === 1}
              onClick={() => fetchNotifications(page - 1)}
            >
              <i className="fas fa-chevron-left"></i> Trước
            </button>
            <span className="page-info">
              Trang {page} / {lastPage}
            </span>
            <button
              className="page-btn"
              disabled={page === lastPage}
              onClick={() => fetchNotifications(page + 1)}
            >
              Sau <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;
