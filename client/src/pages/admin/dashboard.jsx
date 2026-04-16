// Dashboard.jsx
import React, { useEffect, useState } from "react";
import "./dashboard.css";
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
import {
  FaBoxes,
  FaCheckCircle,
  FaTools,
  FaExclamationTriangle,
  FaFolderOpen,
  FaMapMarkerAlt,
  FaClipboardList,
  FaChartLine,
} from "react-icons/fa";
import { getDashboard } from "../../utils/helper";
import { toast } from "react-toastify";

const Dashboard = () => {
  document.title = "Trang Chủ";
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboard();
        if (res.success) {
          const baotri_total =
            res.kpi.baotriDangBaoTri + res.kpi.baotriHoanThanh;
          setData({
            ...res,
            kpi: {
              ...res.kpi,
              baotri_total,
            },
          });
          toast.success(res.message || "Tải Dữ Liệu Thành Công!");
        }
      } catch (error) {
        toast.error(res.message || "Tải Dữ Liệu Thất Bại!");
      }
    };
    fetchDashboard();
  }, []);

  if (!data) return <div className="loading">Đang tải dữ liệu...</div>;

  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];
  const MAINTENANCE_COLORS = ["#3b82f6", "#f97316"];

  const completedPercent = (
    (data.kpi.baotriHoanThanh / data.kpi.baotri_total) *
    100
  ).toFixed(1);
  const pendingPercent = (
    (data.kpi.baotriDangBaoTri / data.kpi.baotri_total) *
    100
  ).toFixed(1);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>
          <FaChartLine className="header-icon" /> Trang Chủ Quản Lý Tài Sản
        </h2>
        <p className="subtitle">Tổng quan tình hình tài sản và bảo trì</p>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon blue">
            <FaBoxes />
          </div>
          <div className="kpi-info">
            <h3>Tổng tài sản</h3>
            <p className="kpi-value">{data.kpi.taisan}</p>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon green">
            <FaCheckCircle />
          </div>
          <div className="kpi-info">
            <h3>Tốt</h3>
            <p className="kpi-value">{data.kpi.tot}</p>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon orange">
            <FaTools />
          </div>
          <div className="kpi-info">
            <h3>Đang bảo trì</h3>
            <p className="kpi-value">{data.kpi.baotri}</p>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon red">
            <FaExclamationTriangle />
          </div>
          <div className="kpi-info">
            <h3>Hỏng</h3>
            <p className="kpi-value">{data.kpi.hong}</p>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon purple">
            <FaFolderOpen />
          </div>
          <div className="kpi-info">
            <h3>Danh mục</h3>
            <p className="kpi-value">{data.kpi.danhmuc}</p>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon indigo">
            <FaMapMarkerAlt />
          </div>
          <div className="kpi-info">
            <h3>Vị trí sử dụng</h3>
            <p className="kpi-value">{data.kpi.location}</p>
          </div>
        </div>
        <div className="kpi-card wide">
          <div className="kpi-icon cyan">
            <FaClipboardList />
          </div>
          <div className="kpi-info">
            <h3>Yêu cầu bảo trì</h3>
            <p className="kpi-value">{data.kpi.baotri_total}</p>
            <div className="progress-badge">
              <span className="completed">
                ✅ {completedPercent}% hoàn thành
              </span>
              <span className="pending">⏳ {pendingPercent}% đang xử lý</span>
            </div>
          </div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h3>📊 Trạng thái tài sản</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data.taisanBieuDo}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {data.taisanBieuDo.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} tài sản`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>🔧 Hiệu suất bảo trì</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={data.baotriBieuDo}
              layout="vertical"
              margin={{ left: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip formatter={(value) => `${value} yêu cầu`} />
              <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]}>
                {data.baotriBieuDo.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={MAINTENANCE_COLORS[index]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="percent-labels">
            <span>✅ Đã hoàn thành: {completedPercent}%</span>
            <span>⏳ Đang bảo trì: {pendingPercent}%</span>
          </div>
        </div>

        <div className="chart-card wide">
          <h3>📈 Xu hướng bảo trì (7 ngày qua)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.baotriXuHuong}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="category-section">
        <h3>📂 Thống kê theo danh mục</h3>
        <div className="category-bars">
          {data.danhmucChiSo.map((cat, idx) => (
            <div key={idx} className="category-item">
              <span>{cat.TenDanhMuc}</span>
              <div className="bar-container">
                <div
                  className="bar-fill"
                  style={{
                    width: `${(cat.total / data.kpi.taisan) * 100}%`,
                    backgroundColor: `hsl(${idx * 45}, 70%, 50%)`,
                  }}
                ></div>
              </div>
              <span className="count">{cat.total}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="tables-grid">
        <div className="table-card">
          <h3>⚠️ Tài sản hỏng</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên tài sản</th>
                  <th>Vị trí</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {data.taisanHong.map((item) => (
                  <tr key={item.MaTaiSan}>
                    <td>{item.MaBaoTri}</td>
                    <td>{item.TenTaiSan}</td>
                    <td>{item.TenPhong || "Không rõ"}</td>
                    <td className="status-broken">{item.TinhTrang}</td>
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
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên tài sản</th>
                  <th>Vị trí</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {data.baotriChuaXuLy.map((item) => (
                  <tr key={item.TenTaiSan}>
                    <td>{item.MaBaoTri}</td>
                    <td>{item.TenTaiSan}</td>
                    <td>{item.location}</td>
                    <td className="status-pending">{item.TinhTrang}</td>
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
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên tài sản</th>
                  <th>Vị trí</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {data.baotriDaHoanThanh.map((item) => (
                  <tr key={item.MaBaoTri}>
                    <td>{item.MaBaoTri}</td>
                    <td>{item.TenTaiSan}</td>
                    <td>{item.TenPhong}</td>
                    <td className="status-completed">{item.TinhTrang}</td>
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
