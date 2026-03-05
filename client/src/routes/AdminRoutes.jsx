import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/admin/dashboard';

// Import các trang admin khác (sẽ thêm sau)
// import AdminUsers from '../pages/admin/Users';
// import AdminSettings from '../pages/admin/Settings';
// import AdminReports from '../pages/admin/Reports';

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Dashboard - Trang chính của admin */}
      <Route index element={<AdminDashboard />} />
      
      {/* Các route con khác của admin */}
      {/* <Route path="users" element={<AdminUsers />} />
      <Route path="settings" element={<AdminSettings />} />
      <Route path="reports" element={<AdminReports />} /> */}
      
      {/* Route mặc định cho admin */}
      <Route path="*" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AdminRoutes;