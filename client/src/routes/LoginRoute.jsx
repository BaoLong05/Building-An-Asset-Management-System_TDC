import { Children } from "react";
import AdminLayout from "./AdminLayout/AdminLayout";
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import PublicRoute from "./PublicRoute";
const LoginRoute = {
  path: "/",
  element: <PublicRoute/>,
  children: [
    {
      index: true,
      element: <Login />,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "reset-password",
      element: <ResetPassword />,
    },
  ],
};
export default LoginRoute;
