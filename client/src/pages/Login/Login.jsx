import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { getLogin } from "../../utils/helper";

const Login = () => {
  document.title = "Đăng Nhập";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  localStorage.clear();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    try {
      const res = await getLogin({
        email: username,
        password: password,
      });
      if (!res.success) {
        toast.error(res.message || "Đăng nhập thất bại!");
        setLoading(false);
        return;
      }
      toast.success("Đăng nhập thành công!");

      sessionStorage.setItem("token", res.token);
      sessionStorage.setItem("user", JSON.stringify(res.user));
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (error) {
      toast.error("Lỗi Server");
    }
  };

  return (
    <div className="login-container">
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

      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
        <div className="bg-circle bg-circle-4"></div>
      </div>

      {/* Main Login Card */}
      <div className="login-card">
        {/* Logo and School Info */}
        <div className="login-header">
          <div className="school-logo">
            <div className="logo-icon">
              <img src="./public/logo/logo1.png" alt="logo" />
            </div>
          </div>
          <h1 className="school-name">TRƯỜNG CAO ĐẲNG CÔNG NGHỆ</h1>
          <h2 className="school-subname">THỦ ĐỨC</h2>
          <p className="system-title">HỆ THỐNG QUẢN LÝ TÀI SẢN</p>
          <div className="divider"></div>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              <svg
                className="input-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              Tên đăng nhập
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <svg
                className="input-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 8H6C4.9 8 4 8.9 4 10V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V10C20 8.9 19.1 8 18 8Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M16 8V6C16 3.8 14.2 2 12 2C9.8 2 8 3.8 8 6V8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="14" r="1.5" fill="currentColor" />
                <path
                  d="M12 16V18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Mật khẩu
            </label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M15 9L21 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 15L3 21"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="forgot-password-wrapper">
            <Link to="/forgot-password" className="forgot-password-link">
              Quên mật khẩu?
            </Link>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Đang đăng nhập...
              </>
            ) : (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 3H19C19.6 3 20 3.4 20 4V20C20 20.6 19.6 21 19 21H15"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 17L15 12L10 7"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 12H3"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Đăng nhập
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p className="copyright">© 2024 Trường Cao đẳng Công nghệ Thủ Đức</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
