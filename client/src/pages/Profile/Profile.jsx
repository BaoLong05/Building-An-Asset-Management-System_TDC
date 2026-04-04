import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getMe } from "../../utils/helper";
import "./Profile.css";

const Profile = () => {
  document.title = "Thông tin cá nhân";
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const token = sessionStorage.getItem("token");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const res = await getMe(token);

      if (res.success) {
        setUser(res.data);
        setFormData({
          name: res.name || "",
          email: res.email || "",
          phone: res.phone || "",
          address: res.address || "",
        });
        toast.success(res.message);
      } else {
        toast.error(res.message || "Không thể tải thông tin người dùng");
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Có lỗi xảy ra, vui lòng đăng nhập lại");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải thông tin...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-icon">👤</span>
          </div>
          <div className="profile-info">
            <h2>{user?.name || "Người dùng"}</h2>
            <p className="profile-joined">
              Tham gia: {formatDate(user?.created_at)}
            </p>
          </div>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h3>Thông tin cá nhân</h3>
          </div>

          <div className="info-display">
            <div className="info-row">
              <span className="info-label">Họ và tên:</span>
              <span className="info-value">
                {user?.name || "Chưa cập nhật"}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">
                {user?.email || "Chưa cập nhật"}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Số điện thoại:</span>
              <span className="info-value">
                {user?.phone || "Chưa cập nhật"}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Địa chỉ:</span>
              <span className="info-value">
                {user?.address || "Chưa cập nhật"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
