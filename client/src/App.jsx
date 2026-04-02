import { useRoutes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import LoginRoute from "./routes/LoginRoute";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const routes = useRoutes([
    AdminRoutes,
    LoginRoute,
   { path: "*", element: <NotFound /> },
  ]);
  return routes;
}

export default App;