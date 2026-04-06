// Dashboard.jsx
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";
import { FaBoxes, FaCheckCircle, FaTools, FaExclamationTriangle, FaFolderOpen, FaMapMarkerAlt, FaClipboardList, FaChartLine } from "react-icons/fa";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Mock data – bổ sung thêm vị trí và phần trăm bảo trì
    const mockData = {
      kpi: {
        assets: 120,
        good: 80,
        maintenance: 25,
        broken: 15,
        categories: 6,
        locations: 8,          // Thêm số lượng vị trí sử dụng
        maintenanceTotal: 40,   // Tổng yêu cầu bảo trì (đã + đang)
        maintenanceCompleted: 30,
        maintenancePending: 10,
      },

      assetStatusChart: [
        { name: "Tốt", value: 80 },
        { name: "Bảo trì", value: 25 },
        { name: "Hỏng", value: 15 },
      ],

      maintenanceStatusChart: [
        { name: "Đã hoàn thành", value: 30, percent: 75 },
        { name: "Đang bảo trì", value: 10, percent: 25 },
      ],

      maintenanceTrend: [
        { date: "01/04", total: 2 },
        { date: "02/04", total: 5 },
        { date: "03/04", total: 3 },
        { date: "04/04", total: 7 },
        { date: "05/04", total: 6 },
        { date: "06/04", total: 9 },
      ],

      categoryStats: [
        { name: "Laptop", total: 40 },
        { name: "Máy in", total: 20 },
        { name: "PC", total: 30 },
        { name: "Máy chiếu", total: 15 },
        { name: "Thiết bị mạng", total: 15 },
      ],

      brokenAssets: [
        { id: 1, name: "Laptop Dell XPS", location: "Phòng A101", status: "Hỏng" },
        { id: 2, name: "Máy in HP LaserJet", location: "Phòng B202", status: "Hỏng" },
        { id: 3, name: "Máy chiếu Epson", location: "Hội trường", status: "Hỏng" },
      ],

      pendingMaintenance: [
        { id: 4, name: "PC Asus Vivo", location: "Phòng A102", status: "Đang sửa" },
        { id: 5, name: "Laptop Acer Swift", location: "Phòng C301", status: "Đang sửa" },
      ],

      completedMaintenance: [
        { id: 6, name: "Laptop HP ProBook", location: "Phòng B101", status: "Hoàn thành" },
        { id: 7, name: "PC Dell Optiplex", location: "Phòng A103", status: "Hoàn thành" },
        { id: 8, name: "Router Cisco", location: "Server room", status: "Hoàn thành" },
      ],
    };

    setData(mockData);
  }, []);

  if (!data) return <div className="loading">Đang tải dữ liệu...</div>;

  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];
  const MAINTENANCE_COLORS = ["#3b82f6", "#f97316"];

  // Tính phần trăm cho bảo trì
  const completedPercent = ((data.kpi.maintenanceCompleted / data.kpi.maintenanceTotal) * 100).toFixed(1);
  const pendingPercent = ((data.kpi.maintenancePending / data.kpi.maintenanceTotal) * 100).toFixed(1);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>
          <FaChartLine className="header-icon" /> Dashboard Quản Lý Tài Sản
        </h2>
        <p className="subtitle">Tổng quan tình hình tài sản và bảo trì</p>
      </div>

      {/* KPI Cards - Hiển thị đầy đủ các chỉ số */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon blue"><FaBoxes /></div>
          <div className="kpi-info">
            <h3>Tổng tài sản</h3>
            <p className="kpi-value">{data.kpi.assets}</p>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon green"><FaCheckCircle /></div>
          <div className="kpi-info">
            <h3>Tốt</h3>
            <p className="kpi-value">{data.kpi.good}</p>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon orange"><FaTools /></div>
          <div className="kpi-info">
            <h3>Đang bảo trì</h3>
            <p className="kpi-value">{data.kpi.maintenance}</p>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon red"><FaExclamationTriangle /></div>
          <div className="kpi-info">
            <h3>Hỏng</h3>
            <p className="kpi-value">{data.kpi.broken}</p>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon purple"><FaFolderOpen /></div>
          <div className="kpi-info">
            <h3>Danh mục</h3>
            <p className="kpi-value">{data.kpi.categories}</p>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon indigo"><FaMapMarkerAlt /></div>
          <div className="kpi-info">
            <h3>Vị trí sử dụng</h3>
            <p className="kpi-value">{data.kpi.locations}</p>
          </div>
        </div>
        <div className="kpi-card wide">
          <div className="kpi-icon cyan"><FaClipboardList /></div>
          <div className="kpi-info">
            <h3>Yêu cầu bảo trì</h3>
            <p className="kpi-value">{data.kpi.maintenanceTotal}</p>
            <div className="progress-badge">
              <span className="completed">✅ {completedPercent}% hoàn thành</span>
              <span className="pending">⏳ {pendingPercent}% đang xử lý</span>
            </div>
          </div>
        </div>
      </div>

      {/* Biểu đồ và thống kê */}
      <div className="charts-row">
        {/* Pie chart trạng thái tài sản */}
        <div className="chart-card">
          <h3>📊 Trạng thái tài sản</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data.assetStatusChart}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.assetStatusChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} tài sản`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart trạng thái bảo trì + phần trăm */}
        <div className="chart-card">
          <h3>🔧 Hiệu suất bảo trì</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.maintenanceStatusChart} layout="vertical" margin={{ left: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip formatter={(value) => `${value} yêu cầu`} />
              <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]}>
                {data.maintenanceStatusChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={MAINTENANCE_COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="percent-labels">
            <span>✅ Đã hoàn thành: {completedPercent}%</span>
            <span>⏳ Đang bảo trì: {pendingPercent}%</span>
          </div>
        </div>

        {/* Line chart xu hướng bảo trì */}
        <div className="chart-card wide">
          <h3>📈 Xu hướng bảo trì (7 ngày qua)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.maintenanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#f97316" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bảng danh mục tài sản (optional nhưng đẹp) */}
      <div className="category-section">
        <h3>📂 Thống kê theo danh mục</h3>
        <div className="category-bars">
          {data.categoryStats.map((cat, idx) => (
            <div key={idx} className="category-item">
              <span>{cat.name}</span>
              <div className="bar-container">
                <div className="bar-fill" style={{ width: `${(cat.total / data.kpi.assets) * 100}%`, backgroundColor: `hsl(${idx * 45}, 70%, 50%)` }}></div>
              </div>
              <span className="count">{cat.total}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bảng liệt kê tài sản hỏng, đang bảo trì, đã hoàn thành */}
      <div className="tables-grid">
        <div className="table-card">
          <h3>⚠️ Tài sản hỏng</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr><th>ID</th><th>Tên tài sản</th><th>Vị trí</th><th>Trạng thái</th></tr>
              </thead>
              <tbody>
                {data.brokenAssets.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td><td>{item.name}</td><td>{item.location}</td><td className="status-broken">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="table-card">
          <h3>🔧 Đang bảo trì</h3>
          <div className="table-responsive">
            <table>
              <thead><tr><th>ID</th><th>Tên tài sản</th><th>Vị trí</th><th>Trạng thái</th></tr></thead>
              <tbody>
                {data.pendingMaintenance.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td><td>{item.name}</td><td>{item.location}</td><td className="status-pending">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="table-card">
          <h3>✅ Đã hoàn thành bảo trì</h3>
          <div className="table-responsive">
            <table>
              <thead><tr><th>ID</th><th>Tên tài sản</th><th>Vị trí</th><th>Trạng thái</th></tr></thead>
              <tbody>
                {data.completedMaintenance.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td><td>{item.name}</td><td>{item.location}</td><td className="status-completed">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;