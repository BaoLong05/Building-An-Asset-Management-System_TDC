import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getMyTask } from "../utils/helper";
import { NOTIFICATION_REFRESH_EVENT } from "./notificationEvents";

const NotificationContext = createContext();
const NOTIFICATION_REFRESH_INTERVAL = 15000;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const isFetchingRef = useRef(false);

  const fetchNotifications = useCallback(async () => {
    if (isFetchingRef.current) return;

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setNotifications([]);
        return;
      }

      isFetchingRef.current = true;
      const res = await getMyTask();

      if (res.success) {
        setNotifications(Array.isArray(res.data) ? res.data : []);
      }
    } catch {
      console.log("Lỗi load notifications");
    } finally {
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    const initialRefresh = window.setTimeout(fetchNotifications, 0);

    const handleFocus = () => fetchNotifications();
    const handleVisibilityChange = () => {
      if (!document.hidden) fetchNotifications();
    };
    const handleRefreshRequest = () => fetchNotifications();

    window.addEventListener("focus", handleFocus);
    window.addEventListener(NOTIFICATION_REFRESH_EVENT, handleRefreshRequest);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    const refreshInterval = window.setInterval(() => {
      if (!document.hidden) fetchNotifications();
    }, NOTIFICATION_REFRESH_INTERVAL);

    return () => {
      window.clearTimeout(initialRefresh);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener(
        NOTIFICATION_REFRESH_EVENT,
        handleRefreshRequest,
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.clearInterval(refreshInterval);
    };
  }, [fetchNotifications]);

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications, fetchNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Context và hook được đặt cùng file để giữ API import hiện tại của ứng dụng.
// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => useContext(NotificationContext);
