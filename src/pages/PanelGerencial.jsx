import { useState } from "react";
import { ObtenerTurnosAtendidos } from "../api/TurnoApi.js";
import "./PanelGerencial.css";
export default function PanelGerencial() {
  const [box, setBox] = useState("");
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const buscar = async () => {
    if (!box || box <= 0) {
      setError("Ingrese un número de box válido");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const data = await ObtenerTurnosAtendidos(box);
      setTurnos(data);
    } catch {
      setError("Error al obtener los turnos");
      setTurnos([]);
    } finally {
      setLoading(false);
    }
  };

  const onChangeBox = (e) => {
    setBox(e.target.value);
    setTurnos([]);
    setError("");
  };

  return (
    <div className="interno">
      <h2>Panel Gerencial</h2>
      
<div className="buscar">
    <input
        type="number"
        placeholder="Número de box"
        value={box}
        onChange={onChangeBox}
      />

      <button onClick={buscar}>Buscar</button>
</div>
      
      <h3>Turnos atendidos por box {box}</h3>

      {loading && <p>Cargando turnos...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && box && turnos.length === 0 && !error && (
        <p>No hay turnos atendidos para este box.</p>
      )}

      {turnos.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Turno</th>
              <th>Box</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((t) => (
              <tr key={t.id}>
                <td>
                  {t.tipo[0]}
                  {String(t.numero).padStart(3, "0")}
                </td>
                <td>BOX {t.box}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && turnos.length > 0 && (
        <h3>Total atendidos: {turnos.length}</h3>
      )}
    </div>
  );
}
