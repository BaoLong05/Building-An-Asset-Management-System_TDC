import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Notification.css";
import { Readed, readed_All } from "../../utils/helper";
import { useNotification } from "../../context/NotificationContext";

const Notification = () => {
  document.title = "Thông báo hệ thống";

  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const { notifications, setNotifications, fetchNotifications } = useNotification();

  useEffect(() => {
    const savedTheme = localStorage.getItem("notificationDarkMode");
    if (savedTheme === "true") setDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("notificationDarkMode", !darkMode);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchNotifications();
      setLoading(false);
    };
    load();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      const res = await Readed(id);

      if (res.success) {
        setNotifications((prev) =>
          prev.map((n) =>
            n.MaBaoTri === id ? { ...n, is_read: true } : n
          )
        );

        toast.success(res.message);
      }
    } catch {
      toast.error("Có lỗi xảy ra");
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await readed_All();

      if (res.success) {
        setNotifications((prev) =>
          prev.map((n) => ({ ...n, is_read: true }))
        );

        toast.success(res.message);
      }
    } catch {
      toast.error("Thao tác thất bại");
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const getTypeIcon = (type) => {
    switch (type) {
      case "warning":
        return "⚠️";
      default:
        return "ℹ️";
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString("vi-VN");
  };

  return (
    <div className={`notification-page ${darkMode ? "dark" : ""}`}>
      <div className="notification-header">
        <h1>🔔 Thông báo hệ thống</h1>

        <div className="header-actions">
          <button onClick={toggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button onClick={markAllAsRead}>
            Đánh dấu tất cả
          </button>
        </div>
      </div>

      <div className="notification-stats">
        <span>Chưa đọc: <strong>{unreadCount}</strong></span>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : notifications.length === 0 ? (
        <p>Không có thông báo</p>
      ) : (
        <div className="notification-list">
          {notifications.map((notif) => (
            <div
              key={notif.MaBaoTri}
              className={`notification-item ${!notif.is_read ? "unread" : ""}`}
            >
              <div>{getTypeIcon("warning")}</div>

              <div>
                <div>Yêu cầu bảo trì</div>
                <div>
                  Tài sản {notif.taisan?.TenTaiSan}
                </div>
                <div>{formatDate(notif.NgayBaoTri)}</div>
              </div>

              {!notif.is_read && (
                <button onClick={() => handleMarkAsRead(notif.MaBaoTri)}>
                  ✓
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;