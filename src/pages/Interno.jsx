import { useEffect, useState } from "react";
import {
  obtenerTurnosDelDia,
  llamarTurno,
  atenderTurno,
 
} from "../api/TurnoApi.js";
import "./Interno.css";

export default function Interno() {
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true);
        const data = await obtenerTurnosDelDia();
        setTurnos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    cargar();
    const interval = setInterval(cargar, 3000);
    return () => clearInterval(interval);
  }, []);

  const llamar = async (turno) => {
  if (turno.estado !== 0) {
    alert("Solo se pueden llamar turnos pendientes");
    return;
  }

  const box = prompt("Ingrese número de box:");
  if (!box) return;

  await llamarTurno(turno.id, Number(box));
};


  const atender = async (turno) => {
  if (turno.estado !== 1) {
    alert("Solo se pueden atender turnos llamados");
    return;
  }

  await atenderTurno(turno.id);
};


  return (
    <div className="interno">
      <h2>Turnos pendientes</h2>

      {cargando && <p>Cargando...</p>}

      <table>
        <thead>
          <tr>
            <th>Turno</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Box</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {turnos
            .filter(t => t.estado !== 2)
            .map(t => (
              <tr key={t.id}>
                <td>
                  {t.tipo[0]}
                  {String(t.numero).padStart(3, "0")}
                </td>
                <td>{t.tipo}</td>
                <td>{t.estado}</td>
                <td>{t.box ?? "-"}</td>

                <td>
                  <button onClick={() => llamar(t)} disabled={t.estado !== 0}>Llamar</button>

                  <button onClick={() => atender(t)}  disabled={t.estado !== 1}>
                    Atendido
                  </button>

                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
