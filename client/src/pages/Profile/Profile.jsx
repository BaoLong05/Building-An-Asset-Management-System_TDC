import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getMe } from "../../utils/helper";
import "./Profile.css";

const Profile = () => {
  document.title = "Thông tin cá nhân";
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [updating, setUpdating] = useState(false);
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: ""
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const res = await getMe();
      
      if (res.success) {
        setUser(res.data);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || ""
        });
      } else {
        toast.error("Không thể tải thông tin người dùng");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    try {
      setUpdating(true);
      const res = await updateProfile(formData);
      
      if (res.success) {
        toast.success("Cập nhật thông tin thành công");
        setUser({ ...user, ...formData });
        setEditing(false);
      } else {
        toast.error(res.message || "Cập nhật thất bại");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors;
        Object.values(apiErrors).forEach(err => {
          toast.error(err[0]);
        });
      } else {
        toast.error(error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại");
      }
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    // Validate frontend
    const newErrors = {};
    if (!passwordData.current_password) {
      newErrors.current_password = "Vui lòng nhập mật khẩu hiện tại";
    }
    if (!passwordData.new_password) {
      newErrors.new_password = "Vui lòng nhập mật khẩu mới";
    } else if (passwordData.new_password.length < 6) {
      newErrors.new_password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      newErrors.new_password_confirmation = "Mật khẩu xác nhận không khớp";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Object.values(newErrors).forEach(msg => toast.error(msg));
      return;
    }
    
    try {
      setUpdating(true);
      const res = await changePassword({
        current_password: passwordData.current_password,
        new_password: passwordData.new_password,
        new_password_confirmation: passwordData.new_password_confirmation
      });
      
      if (res.success) {
        toast.success("Đổi mật khẩu thành công");
        setChangingPassword(false);
        setPasswordData({
          current_password: "",
          new_password: "",
          new_password_confirmation: ""
        });
        setErrors({});
      } else {
        toast.error(res.message || "Đổi mật khẩu thất bại");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach(err => {
          toast.error(err[0]);
        });
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại");
      }
    } finally {
      setUpdating(false);
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
      <div className="profile-card">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-icon">👤</span>
          </div>
          <div className="profile-info">
            <h2>{user?.name || "Người dùng"}</h2>
            {/* <p className="profile-role">{user?.role === "admin" ? "Quản trị viên" : "Thành viên"}</p> */}
            <p className="profile-joined">Tham gia: {formatDate(user?.created_at)}</p>
          </div>
        </div>

        {/* Thông tin cá nhân */}
        <div className="profile-section">
          <div className="section-header">
            <h3>Thông tin cá nhân</h3>
            {!editing && (
              <button className="edit-btn" onClick={() => setEditing(true)}>
                ✏️ Chỉnh sửa
              </button>
            )}
          </div>

          {!editing ? (
            <div className="info-display">
              <div className="info-row">
                <span className="info-label">Họ và tên:</span>
                <span className="info-value">{user?.name || "Chưa cập nhật"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{user?.email || "Chưa cập nhật"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Số điện thoại:</span>
                <span className="info-value">{user?.phone || "Chưa cập nhật"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Địa chỉ:</span>
                <span className="info-value">{user?.address || "Chưa cập nhật"}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleProfileUpdate} className="info-form">
              <div className="form-group">
                <label>Họ và tên</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div className="form-group">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Nhập địa chỉ"
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => {
                  setEditing(false);
                  setFormData({
                    name: user?.name || "",
                    email: user?.email || "",
                    phone: user?.phone || "",
                    address: user?.address || ""
                  });
                }}>
                  Hủy
                </button>
                <button type="submit" className="btn-save" disabled={updating}>
                  {updating ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Đổi mật khẩu */}
        <div className="profile-section">
          <div className="section-header">
            <h3>Đổi mật khẩu</h3>
            {!changingPassword && (
              <button className="edit-btn" onClick={() => setChangingPassword(true)}>
                🔑 Đổi mật khẩu
              </button>
            )}
          </div>

          {!changingPassword ? (
            <div className="info-display">
              <div className="info-row">
                <span className="info-label">Mật khẩu:</span>
                <span className="info-value">••••••••</span>
              </div>
              <p className="password-hint">
                Để bảo mật tài khoản, hãy thay đổi mật khẩu định kỳ
              </p>
            </div>
          ) : (
            <form onSubmit={handlePasswordChange} className="password-form">
              <div className="form-group">
                <label>Mật khẩu hiện tại</label>
                <div className="password-wrapper">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="current_password"
                    value={passwordData.current_password}
                    onChange={handlePasswordInputChange}
                    placeholder="Nhập mật khẩu hiện tại"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.current_password && (
                  <span className="error-message">{errors.current_password}</span>
                )}
              </div>

              <div className="form-group">
                <label>Mật khẩu mới</label>
                <div className="password-wrapper">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="new_password"
                    value={passwordData.new_password}
                    onChange={handlePasswordInputChange}
                    placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.new_password && (
                  <span className="error-message">{errors.new_password}</span>
                )}
              </div>

              <div className="form-group">
                <label>Xác nhận mật khẩu mới</label>
                <div className="password-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="new_password_confirmation"
                    value={passwordData.new_password_confirmation}
                    onChange={handlePasswordInputChange}
                    placeholder="Nhập lại mật khẩu mới"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.new_password_confirmation && (
                  <span className="error-message">{errors.new_password_confirmation}</span>
                )}
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => {
                  setChangingPassword(false);
                  setPasswordData({
                    current_password: "",
                    new_password: "",
                    new_password_confirmation: ""
                  });
                  setErrors({});
                }}>
                  Hủy
                </button>
                <button type="submit" className="btn-save" disabled={updating}>
                  {updating ? "Đang xử lý..." : "Cập nhật mật khẩu"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;