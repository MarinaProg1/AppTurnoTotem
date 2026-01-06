const API_URL = "http://turnototems.runasp.net/Turno";

// crear turno
export const crearTurno = async (tipo) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({tipo}),
  });
  return await res.json();
};
// obtener turnos del dia 
export const obtenerTurnosDelDia = async ()=> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Error al obtener turnos");
  }
  return await res.json();
}

// obtener pendientes
export const obtenerPendientes = async () => {
  const res = await fetch(`${API_URL}/pendientes`);
  return await res.json();
};

// ontener turnos llamados
export const obtenerTurnosLlamados = async () => {
  const res = await fetch(`${API_URL}/llamados`);
  return await res.json();
}
// obtener turnos atendidos por box
export const ObtenerTurnosAtendidos = async (box)=>{
  const res = await fetch(`${API_URL}/atendidos/${box}`);
  if (!res.ok) {
    throw new Error("Error al obtener turnos atendidos");
  }
  return await res.json();
}
// llamar turno
export const llamarTurno = async (id, box) => {
  const res = await fetch(`${API_URL}/${id}/llamado`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(box),
  });
  return await res.json();
};

// atender turno
export const atenderTurno = async (id) => {
  const res = await fetch(`${API_URL}/${id}/atender`, {
    method: "POST",
  });
  return await res.json();
};

