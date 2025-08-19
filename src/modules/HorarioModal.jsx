// ⚠️ Recomendación:
// El modal se renderiza encima de toda la UI, su lógica debe ser global
// (no dentro de cada tarjeta) para evitar duplicados, errores de estado
// y problemas de estilo. Usar un único <HorarioModal> en Dashboard.

import { useState } from "react";

export default function HorarioModal({ isOpen, onClose, medicamento, horarios, setHorarios }) {
  const [personalizado, setPersonalizado] = useState("");

  const agregarHorario = (hora) => {
    if (!hora) return;
    setHorarios((prev) => {
      const nuevos = { ...prev };
      if (!nuevos[medicamento]) nuevos[medicamento] = [];
      // Evita duplicados
      if (!nuevos[medicamento].includes(hora)) {
        nuevos[medicamento].push(hora);
      }
      localStorage.setItem("horarios", JSON.stringify(nuevos));
      return nuevos;
    });
    setPersonalizado("");
  };

  const eliminarHorario = (index) => {
    setHorarios((prev) => {
      const nuevos = { ...prev };
      if (nuevos[medicamento]) {
        nuevos[medicamento].splice(index, 1);
      }
      localStorage.setItem("horarios", JSON.stringify(nuevos));
      return { ...nuevos };
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Añadir horario para {medicamento}</h2>

        {/* Botones rápidos */}
        <div className="quick-buttons">
          {[24, 12, 8, 4].map((h) => (
            <button key={h} onClick={() => agregarHorario(`Cada ${h}h`)}>
              Cada {h}h
            </button>
          ))}
        </div>

        {/* Input personalizado */}
        <div className="custom-time">
          <label>Horario personalizado:</label>
          <input
            type="time"
            value={personalizado}
            onChange={(e) => setPersonalizado(e.target.value)}
          />
          <button onClick={() => agregarHorario(personalizado)}>Guardar</button>
        </div>

        {/* Lista de horarios */}
        <h3>Horarios guardados</h3>
        <ul>
          {(horarios[medicamento] || []).map((h, i) => (
            <li key={i}>
              {h}
              <button
                style={{
                  marginLeft: "10px",
                  background: "#ff4757",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  cursor: "pointer"
                }}
                onClick={() => eliminarHorario(i)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {/* Botón cerrar */}
        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
