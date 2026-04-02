import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { forgotPassword } from "../../utils/helper";
import "react-toastify/dist/ReactToastify.css";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  document.title = "Quên mật khẩu";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!email.trim()) {
      toast.error("Vui lòng nhập email");
      return;
    }

    setLoading(true);

    try {
      const res = await forgotPassword(email);

      if (res.success) {
        toast.success(
          res.message || "Link đặt lại mật khẩu đã được gửi đến email của bạn",
          {
            onClose: () => navigate("/"),
          },
        );
      } else {
        if (res.errors) {
          Object.values(res.errors)
            .flat()
            .forEach((msg) => {
              toast.error(msg);
            });
        } else {
          toast.error(res.message || "Không thể gửi yêu cầu");
        }
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
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
      <main className="forgot-password-main">
        <div className="container">
          <div className="forgot-password-card">
            <div className="forgot-password-header">
              <span className="header-icon">🔐</span>
              <h1>Quên mật khẩu?</h1>
              <p>Nhập email của bạn để nhận link đặt lại mật khẩu</p>
            </div>

            <form onSubmit={handleSubmit} className="forgot-password-form">
              <div className="form-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Đang gửi..." : "Gửi yêu cầu"}
              </button>

              <div className="forgot-password-footer">
                <Link to="/" className="back-link">
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

export default ForgotPassword;
