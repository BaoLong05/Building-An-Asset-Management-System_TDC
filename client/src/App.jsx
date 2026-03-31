import { useRoutes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import LoginRoute from "./routes/LoginRoute";

function App() {
  const routes = useRoutes([
    AdminRoutes,
    LoginRoute,
  ]);
  return routes;
}

export default App;