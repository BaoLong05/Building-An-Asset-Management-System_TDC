import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="college-footer">
      <div className="footer-container">
        {/* Phần thông tin chính */}
        <div className="footer-main">
          {/* Cột 1: Thông tin trường */}
          <div className="footer-col">
            <h3 className="footer-title">TRƯỜNG CAO ĐẲNG CÔNG NGHỆ THỦ ĐỨC</h3>
            <div className="footer-info">
              <p><span className="footer-icon">📍</span> 53 Võ Văn Ngân, Phường Thủ Đức, TP.HCM</p>
              <p><span className="footer-icon">📞</span> 028.3897.0023 - 028.3897.2339</p>
              <p><span className="footer-icon">📠</span> 028.3896.2474</p>
              <p><span className="footer-icon">✉️</span> Email: info@tdc.edu.vn</p>
              <p><span className="footer-icon">🌐</span> Website: www.tdc.edu.vn</p>
            </div>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div className="footer-col">
            <h3 className="footer-title">LIÊN KẾT NHANH</h3>
            <ul className="footer-links">
              <li><a href="#">Giới thiệu</a></li>
              <li><a href="#">Tuyển sinh</a></li>
              <li><a href="#">Chương trình đào tạo</a></li>
              <li><a href="#">Lịch công tác</a></li>
              <li><a href="#">Thư viện</a></li>
              <li><a href="#">Liên hệ</a></li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ sinh viên */}
          <div className="footer-col">
            <h3 className="footer-title">HỖ TRỢ SINH VIÊN</h3>
            <ul className="footer-links">
              <li><a href="#">Cổng thông tin sinh viên</a></li>
              <li><a href="#">Đăng ký môn học</a></li>
              <li><a href="#">Tra cứu điểm</a></li>
              <li><a href="#">Học phí</a></li>
              <li><a href="#">Học bổng</a></li>
              <li><a href="#">Việc làm</a></li>
            </ul>
          </div>

          {/* Cột 4: Mạng xã hội */}
          <div className="footer-col">
            <h3 className="footer-title">KẾT NỐI VỚI CHÚNG TÔI</h3>
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="Facebook">📘</a>
              <a href="#" className="social-icon" aria-label="YouTube">▶️</a>
              <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
              <a href="#" className="social-icon" aria-label="LinkedIn">🔗</a>
              <a href="#" className="social-icon" aria-label="Instagram">📷</a>
            </div>
            <div className="footer-newsletter">
              <h4>Đăng ký nhận tin</h4>
              <form className="newsletter-form">
                <input type="email" placeholder="Nhập email của bạn" />
                <button type="submit">Gửi</button>
              </form>
            </div>
          </div>
        </div>

        {/* Phần bản quyền */}
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {currentYear} Trường Cao đẳng Công nghệ Thủ Đức. Tất cả quyền được bảo lưu.
          </div>
          <div className="footer-bottom-links">
            <a href="#">Chính sách bảo mật</a>
            <span className="separator">|</span>
            <a href="#">Điều khoản sử dụng</a>
            <span className="separator">|</span>
            <a href="#">Sơ đồ trang</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;