import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";

function App() {
  return (
    <BrowserRouter basename="/admin">
      {/* <Header/> */}
      <Routes>
        <Route path="/*" element={<AdminRoutes />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;