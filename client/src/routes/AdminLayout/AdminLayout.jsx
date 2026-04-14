import { Outlet } from "react-router-dom";
import SidebarLayout from "../../components/SidebarLayout/SidebarLayout";
import "./AdminLayout.css";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import ChatBotAI from "../../pages/ChatBotAI/ChatBotAI";

function AdminLayout() {
  return (
    <div className="admin-container">
      <div className="header">
      <Header /> 
      </div>

      <div className="admin-body">
        <SidebarLayout />
        <div className="admin-content">
          <ChatBotAI/>
          <Outlet />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default AdminLayout;