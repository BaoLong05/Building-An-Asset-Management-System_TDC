import { createContext, useContext, useState, useEffect } from "react";
import { getMyTask } from "../utils/helper";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      const res = await getMyTask();

      if (res.success) {
        setNotifications(res.data); 
      }
    } catch (error) {
      console.log("Lỗi load notifications");
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications, fetchNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);