import { useEffect, useState } from "react";
import { obtenerTurnosLlamados } from "../api/TurnoApi.js";
import "./Pantalla.css";

export default function Pantalla() {
  const [turnos, setTurnos] = useState([]);

  // ✅ después el useEffect
  useEffect(() => {
  const cargarTurnos = async () => {
    try {
      const data = await obtenerTurnosLlamados();
      setTurnos(data);
    } catch (err) {
      console.error(err);
    }
  };
   cargarTurnos(); // ahora es seguro

  const interval = setInterval(cargarTurnos, 3000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="pantalla">
      <h2>Turnos llamados</h2>

      {turnos.map(t => (
        <div key={t.id} className="turno">
          <strong>
            {t.tipo[0]}
            {String(t.numero).padStart(3, "0")}
          </strong>
          {" "}  – Box {t.box}
        </div>
      ))}
    </div>
  );
}
