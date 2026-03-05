import React, { useState } from 'react';
import './dashboard.css';

const AssetManagementDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  
  // State cho danh sách tài sản
  const [assets] = useState([
    { id: 1, name: 'Máy tính Dell Optiplex', category: 'Máy tính', quantity: 25, status: 'Tốt', location: 'Phòng A101', lastMaintenance: '2024-01-15' },
    { id: 2, name: 'Máy chiếu Epson', category: 'Thiết bị trình chiếu', quantity: 5, status: 'Cần bảo trì', location: 'Phòng A102', lastMaintenance: '2024-02-10' },
    { id: 3, name: 'Bảng tương tác', category: 'Thiết bị giảng dạy', quantity: 3, status: 'Tốt', location: 'Phòng A103', lastMaintenance: '2024-03-05' },
    { id: 4, name: 'Máy in Laser', category: 'Máy in', quantity: 4, status: 'Hỏng', location: 'Phòng B201', lastMaintenance: '2024-02-20' },
    { id: 5, name: 'Router Cisco', category: 'Mạng', quantity: 8, status: 'Tốt', location: 'Phòng Server', lastMaintenance: '2024-03-01' },
  ]);

  // Thống kê
  const statistics = {
    totalAssets: assets.reduce((sum, asset) => sum + asset.quantity, 0),
    totalValue: '2.5B',
    totalItems: assets.length,
    goodCondition: assets.filter(a => a.status === 'Tốt').reduce((sum, a) => sum + a.quantity, 0),
    needMaintenance: assets.filter(a => a.status === 'Cần bảo trì').reduce((sum, a) => sum + a.quantity, 0),
    broken: assets.filter(a => a.status === 'Hỏng').reduce((sum, a) => sum + a.quantity, 0)
  };

  // Danh sách menu
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'assets', name: 'Tài sản', icon: '💻' },
    { id: 'categories', name: 'Danh mục', icon: '📁' },
    { id: 'maintenance', name: 'Bảo trì', icon: '🔧' },
    { id: 'borrow', name: 'Mượn trả', icon: '📝' },
    { id: 'reports', name: 'Báo cáo', icon: '📈' },
    { id: 'settings', name: 'Cài đặt', icon: '⚙️' }
  ];

  // Danh sách phương thức thanh toán (cho giao diện mẫu)
  const paymentMethods = [
    { name: 'Visa Card', icon: '💳', amount: '$12,875', trend: '+2%' },
    { name: 'MasterCard', icon: '💳', amount: '$8,450', trend: '+1.5%' },
    { name: 'PayPal', icon: '📱', amount: '$5,230', trend: '-0.5%' },
    { name: 'Others', icon: '💵', amount: '$3,120', trend: '+3%' }
  ];

  // Danh sách giao dịch gần đây
  const recentTransactions = [
    { id: 1, description: 'Figma Subscription', amount: '$1200', status: 'Success', icon: '🎨' },
    { id: 2, description: 'Upwork - Wishnow', amount: '$480', status: 'Success', icon: '💼' },
    { id: 3, description: 'Adobe Creative Cloud', amount: '$540', status: 'Pending', icon: '✨' },
    { id: 4, description: 'AWS Services', amount: '$890', status: 'Success', icon: '☁️' },
    { id: 5, description: 'Microsoft 365', amount: '$350', status: 'Success', icon: '📊' }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const renderPage = () => {
    switch(activePage) {
      case 'dashboard':
        return (
          <>
            {/* Revenue Section */}
            <div className="revenue-section">
              <div className="revenue-header">
                <h3>Doanh thu</h3>
                <div className="revenue-tabs">
                  <span className="active">Tháng này</span>
                  <span>Tháng trước</span>
                </div>
              </div>
              <div className="revenue-amount">
                <span className="amount">$86,589</span>
                <span className="compare">$86,589</span>
              </div>
            </div>

            {/* Coverage & Method */}
            <div className="analytics-grid">
              <div className="analytics-card">
                <h3>Phạm vi bao phủ</h3>
                <div className="coverage-circle">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path className="circle"
                      strokeDasharray="75, 100"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className="percentage">75%</text>
                  </svg>
                </div>
              </div>

              <div className="analytics-card">
                <h3>Phương thức</h3>
                <div className="methods-list">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="method-item">
                      <span className="method-icon">{method.icon}</span>
                      <span className="method-name">{method.name}</span>
                      <span className="method-amount">{method.amount}</span>
                      <span className={`method-trend ${method.trend.includes('+') ? 'positive' : 'negative'}`}>
                        {method.trend}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PDF Report */}
            <div className="report-card">
              <h3>Báo cáo PDF</h3>
              <p>Tải báo cáo của bạn</p>
              <button className="download-btn">📥 Tải xuống</button>
            </div>

            {/* Total Earning */}
            <div className="earning-card">
              <h3>Tổng thu nhập</h3>
              <div className="earning-amount">
                <span className="amount">$12,875</span>
                <span className="trend">▲ 2%</span>
              </div>
              <p className="compare-text">So với $21,504 năm ngoái</p>
            </div>

            {/* Statistics by Category */}
            <div className="category-stats">
              <h3>Thống kê theo danh mục</h3>
              <div className="category-item">
                <span>Máy tính</span>
                <span className="percentage">45%</span>
                <span className="value">862</span>
              </div>
              <div className="category-item">
                <span>Thiết bị trình chiếu</span>
                <span className="percentage">28%</span>
                <span className="value">753</span>
              </div>
              <div className="category-item">
                <span>Thiết bị mạng</span>
                <span className="percentage">27%</span>
                <span className="value">553</span>
              </div>
            </div>

            {/* Latest Transactions */}
            <div className="transactions-card">
              <h3>Giao dịch gần đây</h3>
              {recentTransactions.map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <span className="transaction-icon">{transaction.icon}</span>
                  <div className="transaction-info">
                    <p className="transaction-desc">{transaction.description}</p>
                    <span className={`transaction-status ${transaction.status.toLowerCase()}`}>
                      {transaction.status}
                    </span>
                  </div>
                  <span className="transaction-amount">{transaction.amount}</span>
                </div>
              ))}
            </div>
          </>
        );
      case 'assets':
        return <div className="page-placeholder">Trang Quản lý Tài sản - Đang phát triển</div>;
      case 'categories':
        return <div className="page-placeholder">Trang Quản lý Danh mục - Đang phát triển</div>;
      case 'maintenance':
        return <div className="page-placeholder">Trang Quản lý Bảo trì - Đang phát triển</div>;
      case 'borrow':
        return <div className="page-placeholder">Trang Quản lý Mượn trả - Đang phát triển</div>;
      case 'reports':
        return <div className="page-placeholder">Trang Báo cáo - Đang phát triển</div>;
      case 'settings':
        return <div className="page-placeholder">Trang Cài đặt - Đang phát triển</div>;
      default:
        return null;
    }
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo">
          <h2>🏢 Quản Lý Tài Sản</h2>
        </div>

        <nav className="nav-menu">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <span className="nav-icon">🚪</span>
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="page-title">
            <h1>{menuItems.find(item => item.id === activePage)?.name}</h1>
          </div>
          
          <div className="top-bar-actions">
            <button className="theme-toggle" onClick={toggleDarkMode}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            <div className="language-select">
              <select>
                <option value="vn">🇻🇳 Tiếng Việt</option>
                <option value="us">🇺🇸 English</option>
                <option value="ru">🇷🇺 Русский</option>
              </select>
            </div>
            <div className="user-profile">
              <span className="avatar">👤</span>
              <span className="user-name">Admin</span>
            </div>
          </div>
        </header>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Statistics Cards */}
          <div className="stat-cards">
            <div className="stat-card">
              <div className="stat-info">
                <span className="stat-label">Tổng tài sản</span>
                <span className="stat-value">{statistics.totalAssets}</span>
                <span className="stat-trend">+2.5% ↑</span>
              </div>
              <div className="stat-icon">📊</div>
              <div className="stat-compare">So với ({statistics.totalItems} loại)</div>
            </div>

            <div className="stat-card">
              <div className="stat-info">
                <span className="stat-label">Giá trị</span>
                <span className="stat-value">{statistics.totalValue}</span>
                <span className="stat-trend">+0.5% ↑</span>
              </div>
              <div className="stat-icon">💰</div>
              <div className="stat-compare">So với (2.1B năm ngoái)</div>
            </div>

            <div className="stat-card">
              <div className="stat-info">
                <span className="stat-label">Đang bảo trì</span>
                <span className="stat-value">{statistics.needMaintenance}</span>
                <span className="stat-trend negative">-1.5% ↓</span>
              </div>
              <div className="stat-icon">🔧</div>
              <div className="stat-compare">So với (12 tháng trước)</div>
            </div>

            <div className="stat-card">
              <div className="stat-info">
                <span className="stat-label">Tiết kiệm</span>
                <span className="stat-value">$3,711</span>
                <span className="stat-trend negative">-1.5% ↓</span>
              </div>
              <div className="stat-icon">💰</div>
              <div className="stat-compare">So với ($8,542 năm ngoái)</div>
            </div>
          </div>

          {/* Dynamic Content based on selected page */}
          <div className="dynamic-content">
            {renderPage()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssetManagementDashboard;