import { useRoutes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import LoginRoute from "./routes/LoginRoute";
import NotFound from "./pages/NotFound/NotFound";
import { getMyTask } from "./utils/helper";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { NotificationProvider } from "./context/NotificationContext";

function App() {
  const routes = useRoutes([
    AdminRoutes,
    LoginRoute,
    { path: "*", element: <NotFound /> },
  ]);

  useEffect(() => {
    checkNotifications();
  }, []);

  const checkNotifications = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      const res = await getMyTask();

      if (res.success && res.data.length > 0) {
        const show = sessionStorage.getItem("notification_shown");

        if (!show) {
          toast.info(`Bạn có ${res.data.length} nhiệm vụ cần được bảo trì!`);
          sessionStorage.setItem("notification_shown", "true"); // ✅ FIX
        }
      }
    } catch (error) {
      toast.error("Lỗi khi lấy thông báo");
    }
  };

  return (
    <NotificationProvider>
      {routes}
      <ToastContainer position="top-right" autoClose={3000} />
    </NotificationProvider>
  );
}

export default App;