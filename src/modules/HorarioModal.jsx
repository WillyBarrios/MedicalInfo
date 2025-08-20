import { useState } from "react"; // Hook de React para manejar estados internos
import "../estilos/modal.css";    // Importa los estilos CSS del modal

// Componente Modal para agregar o eliminar horarios de un medicamento
export default function HorarioModal({ isOpen, onClose, medicamento, horarios, setHorarios }) {
  // Estado para manejar el valor del input de horario personalizado
  const [personalizado, setPersonalizado] = useState("");

  // Función para agregar un horario (ya sea uno de los botones o personalizado)
  const agregarHorario = (hora) => {
    if (!hora) return; // Si no hay valor, no hace nada
    setHorarios((prev) => {
      // Copia los horarios previos y asigna el nuevo al medicamento actual
      const nuevos = { ...prev, [medicamento]: [hora] };
      // Guarda en localStorage para persistencia
      localStorage.setItem("horarios", JSON.stringify(nuevos));
      return nuevos;
    });
    // Reinicia el input personalizado
    setPersonalizado("");
  };

  // Función para eliminar el horario del medicamento actual
  const eliminarHorario = () => {
    setHorarios((prev) => {
      // Copia los horarios pero vacía el arreglo del medicamento actual
      const nuevos = { ...prev, [medicamento]: [] };
      // Actualiza también en localStorage
      localStorage.setItem("horarios", JSON.stringify(nuevos));
      return nuevos;
    });
  };

  // Si el modal no está abierto, no renderiza nada
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      {/* Contenido del modal, detenemos propagación para que no se cierre si clicamos dentro */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botón para cerrar el modal */}
        <span className="close" onClick={onClose}>×</span>

        <h2>Añadir horario para {medicamento}</h2>

        {/* Botones rápidos con intervalos predefinidos */}
        <div>
          {[24, 12, 8, 4].map((h) => (
            <button key={h} className="interval-btn" onClick={() => agregarHorario(`Cada ${h}h`)}>
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

        {/* Botón para guardar el horario personalizado */}
        <button className="save-btn" onClick={() => agregarHorario(personalizado)}>
          Guardar horario
        </button>

        {/* Mostrar horario guardado si existe */}
        <h3>Horario guardado</h3>
        {horarios[medicamento]?.length > 0 ? (
          <div className="horario-guardado">
            <p>{horarios[medicamento][0]}</p>
            {/* Botón para eliminar el horario */}
            <button className="delete-btn" onClick={eliminarHorario}>✕</button>
          </div>
        ) : (
          <p>No hay horario asignado</p>
        )}
      </div>
    </div>
  );
}
