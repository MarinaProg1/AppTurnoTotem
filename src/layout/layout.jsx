// src/layout/Layout.jsx
import { Link, Outlet } from 'react-router-dom'
import './layout.css'
export default function Layout() {
  

  return (
    <div className="cont-layout">
      {/* NAV SUPERIOR */}
      <nav>
        <Link to="/totem" className="link">Demo Tótem</Link>
        <Link to="/interno" className="link">Demo Interno</Link>
        <Link to="/pantalla" className="link">Demo Pantalla</Link>
        <Link to="/panelGerencial" className="link">Demo Gerencia</Link>
      </nav>

      {/* CONTENIDO DINÁMICO */}
      <div  className="contentOutlet">
        <Outlet />
      </div>


    </div>
  )
}
