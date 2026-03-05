import { useRoutes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  const routes = useRoutes([
    AdminRoutes
  ]);

  return routes;
}

export default App;