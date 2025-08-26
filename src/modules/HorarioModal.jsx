import { useState } from "react";
import "../estilos/modal.css";

export default function HorarioModal({ isOpen, onClose, medicamento, horarios, setHorarios }) {
  const [personalizado, setPersonalizado] = useState("");

  // Agregar un horario personalizado o predefinido
  const agregarHorario = (hora, esPersonalizado = false) => {
    if (!hora) return;

    setHorarios((prev) => {
      const existentes = prev[medicamento] || [];

      // Si es personalizado, verificamos límite
      if (esPersonalizado) {
        const personalizados = existentes.filter((h) => /^\d{2}:\d{2}$/.test(h)); // solo los que son tipo "hh:mm"
        if (personalizados.length >= 6) {
          alert("Solo se permiten hasta 6 horarios personalizados.");
          return prev;
        }
      }

      // Evitamos duplicados
      if (existentes.includes(hora)) return prev;

      const nuevos = { ...prev, [medicamento]: [...existentes, hora] };
      localStorage.setItem("horarios", JSON.stringify(nuevos));
      return nuevos;
    });

    setPersonalizado("");
  };

  // Eliminar un horario específico
  const eliminarHorario = (hora) => {
    setHorarios((prev) => {
      const filtrados = prev[medicamento].filter((h) => h !== hora);
      const nuevos = { ...prev, [medicamento]: filtrados };
      localStorage.setItem("horarios", JSON.stringify(nuevos));
      return nuevos;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>×</span>

        <h2>Añadir horario para {medicamento}</h2>

        {/* Botones rápidos con intervalos predefinidos */}
        <div>
          {[24, 12, 8, 4].map((h) => (
            <button
              key={h}
              className="interval-btn"
              onClick={() => agregarHorario(`Cada ${h}h`)}
            >
              Cada {h}h
            </button>
          ))}
        </div>

        {/* Input para ingresar manualmente una hora */}
        <input
          type="time"
          value={personalizado}
          onChange={(e) => setPersonalizado(e.target.value)}
        />

        <button className="save-btn" onClick={() => agregarHorario(personalizado, true)}>
          Guardar horario
        </button>

        {/* Mostrar todos los horarios guardados */}
        <h3>Horarios guardados</h3>
        {horarios[medicamento]?.length > 0 ? (
          <div className="horarios-guardados">
            {horarios[medicamento].map((hora, idx) => (
              <div key={idx} className="horario-item">
                <p>{hora}</p>
                <button className="delete-btn" onClick={() => eliminarHorario(hora)}>✕</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay horarios asignados</p>
        )}
      </div>
    </div>
  );
}
