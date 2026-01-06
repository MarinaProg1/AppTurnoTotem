import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/layout.jsx";
import Totem from "./pages/Totem";
import Pantalla from "./pages/Pantalla";
import Interno from "./pages/Interno";
import PanelGerencial from "./pages/PanelGerencial";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="totem" element={<Totem />} />
          <Route path="pantalla" element={<Pantalla />} />
          <Route path="interno" element={<Interno />} />
          <Route path="panelGerencial" element={<PanelGerencial />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
