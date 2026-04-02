import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import { resetPassword } from "../../utils/helper";
import "./ResetPassword.css";

const ResetPassword = () => {
  document.title = "Đặt lại mật khẩu";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get("token");
  const emailFromUrl = searchParams.get("email");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    token: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (tokenFromUrl && emailFromUrl) {
      setFormData((prev) => ({
        ...prev,
        email: emailFromUrl,
        token: tokenFromUrl,
      }));
    } else {
      toast.error("Link đặt lại mật khẩu không hợp lệ");
      navigate("/forgot-password");
    }
  }, [tokenFromUrl, emailFromUrl, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const newErrors = {};
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu mới";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "Vui lòng xác nhận mật khẩu";
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Mật khẩu xác nhận không khớp";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Object.values(newErrors).forEach((msg) => toast.error(msg));
      return;
    }

    setLoading(true);

    try {
      const res = await resetPassword({
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        token: formData.token,
      });

      if (res.success) {
        toast.success("Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại");
        navigate("/");
      } else {
        if (res.errors) {
          Object.values(res.errors).forEach((fieldErrors) => {
            fieldErrors.forEach((msg) => toast.error(msg));
          });
        }
        else if (res.message) {
          toast.error(res.message);
        }
        if (res.message?.toLowerCase().includes("token")) {
          navigate("/forgot-password");
        }
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
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
      <main className="reset-password-main">
        <div className="container">
          <div className="reset-password-card">
            <div className="reset-password-header">
              <span className="header-icon">🔐</span>
              <h1>Đặt lại mật khẩu</h1>
              <p>Nhập mật khẩu mới cho tài khoản của bạn</p>
            </div>

            <form onSubmit={handleSubmit} className="reset-password-form">
              <div className="form-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    disabled
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Mật khẩu mới</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Nhập mật khẩu mới"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <div className="form-group">
                <label>Xác nhận mật khẩu mới</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    placeholder="Nhập lại mật khẩu mới"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.password_confirmation && (
                  <span className="error-message">
                    {errors.password_confirmation}
                  </span>
                )}
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
              </button>

              <div className="reset-password-footer">
                <Link to="/login" className="back-link">
                  ← Quay lại đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
