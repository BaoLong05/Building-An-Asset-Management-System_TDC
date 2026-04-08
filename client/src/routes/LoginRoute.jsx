import PublicRoute from "./PublicRoute";
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";

const LoginLayout = () => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "calc(100vh - 160px)" }}>
        <PublicRoute />
      </div>
      <Footer />
    </>
  );
};

const LoginRoute = {
  path: "/",
  element: <LoginLayout />, // 🔥 bọc ở đây
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