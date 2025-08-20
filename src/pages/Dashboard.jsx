import React, { useEffect, useState } from "react";
import Navbar from "../modules/Navbar.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";
import "../estilos/cards.css";
import "../estilos/dashboard.css";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import Footer from "../modules/Footer.jsx";
import HorarioModal from "../modules/HorarioModal.jsx";

const driverObj = driver({
  prevBtnText: "Anterior",
  nextBtnText: "Siguiente",
  finishBtnText: "Finalizar",
  doneBtnText: "Cerrar",
  allowClose: true,
  animate: true,
  showProgress: true,
  showButtons: ["next", "previous", "close"],
  steps: [
    {
      element: ".dashboard-title",
      popover: {
        title: "Listado de favoritos",
        description: "Aquí se cargan los medicamentos que has marcado como favoritos.",
        position: "right",
      },
    },
    {
      element: ".medicine-card",
      popover: {
        title: "Medicamento",
        description: "Cada tarjeta representa un medicamento favorito.",
        position: "right",
      },
    },
    {
      element: ".favorite-btn.active",
      popover: {
        title: "Botón de favoritos",
        description: "Quita el medicamento de tus favoritos.",
        position: "right",
      },
    },
    {
      element: "#terminamos",
      popover: {
        title: "Terminamos",
        description: "Fin de la presentación del dashboard.",
        position: "left",
      },
    },
  ],
});
driverObj.drive();

function getCimaImageUrl(med) {
  const base = "https://cima.aemps.es/cima";
  const candidates = [];

  if (med.foto) candidates.push(med.foto);
  if (Array.isArray(med.fotos)) {
    med.fotos.forEach((f) => {
      if (f?.url) candidates.push(f.url);
      else if (typeof f === "string") candidates.push(f);
    });
  }

  for (const raw of candidates) {
    if (typeof raw !== "string" || raw.length === 0) continue;
    const clean = raw.split("?")[0].split("#")[0].toLowerCase();
    if (clean.endsWith(".jpg") || clean.endsWith(".jpeg") || clean.endsWith(".png")) {
      return raw.startsWith("http") ? raw : `${base}${raw}`;
    }
  }
  return null;
}

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GOOGLE_CX = import.meta.env.VITE_GOOGLE_CX;

async function fetchGoogleImage(query) {
  if (!GOOGLE_API_KEY || !GOOGLE_CX) return null;
  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&searchType=image&q=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    if (json.items?.length > 0) return json.items[0].link;
  } catch {
    return null;
  }
  return null;
}

export default function Dashboard() {
  const { favorites, removeFavorite } = useFavorites();
  const [imageMap, setImageMap] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [horarios, setHorarios] = useState(() => {
    const saved = localStorage.getItem("horarios");
    return saved ? JSON.parse(saved) : {};
  });
  const [selectedMed, setSelectedMed] = useState(null);

  useEffect(() => {
    const initial = {};
    favorites.forEach((m) => {
      if (m.imageUrl) initial[m.nregistro] = m.imageUrl;
    });
    setImageMap((prev) => ({ ...initial, ...prev }));
  }, [favorites]);

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="cards-container dashboard-container">
        <h2 className="dashboard-title">Favoritos</h2>

        {favorites.length === 0 ? (
          <p className="no-results">No hay medicamentos en favoritos.</p>
        ) : (
          <div className="results-container">
            {favorites.map((med) => {
              const cimaUrl = getCimaImageUrl(med);
              const saved = imageMap[med.nregistro] || med.imageUrl || null;
              const imageSrc = cimaUrl || saved || "https://placehold.co/250x150?text=Sin+imagen";

              return (
                <div key={med.nregistro} className="medicine-card">
                  <button
                    className="favorite-btn active"
                    title="Quitar de favoritos"
                    onClick={() => removeFavorite(med.nregistro)}
                    aria-label={`Quitar ${med.nombre} de favoritos`}
                  >
                    ✓
                  </button>

                  <img
                    src={imageSrc}
                    alt={med.nombre}
                    className="medicine-image"
                    onError={async (e) => {
                      if (!saved && !cimaUrl) {
                        const url = await fetchGoogleImage(med.nombre);
                        if (url) {
                          setImageMap((prev) => ({ ...prev, [med.nregistro]: url }));
                          e.currentTarget.src = url;
                          return;
                        }
                      }
                      e.currentTarget.src = "https://placehold.co/250x150?text=Sin+imagen";
                    }}
                  />

                  <h3 className="medicine-title">{med.nombre}</h3>
                  <p className="medicine-info"><b>ID:</b> {med.nregistro}</p>
                  <p className="medicine-info">
                    <b>Vía de administración:</b> {med.formaFarmaceutica?.nombre || "-"}
                  </p>
                  <p className="medicine-info">
                    <b>Laboratorio:</b> {med.labcomercializador || "-"}
                  </p>
                  <p className="medicine-info">
                    <b>Horario:</b>{" "}
                    {horarios[med.nombre]?.length > 0 ? horarios[med.nombre][0] : "No asignado"}
                  </p>

                  <button
                    className="open-modal-btn"
                    onClick={() => {
                      setSelectedMed(med.nombre);
                      setIsModalOpen(true);
                    }}
                  >
                    ➕ Añadir horario
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isModalOpen && (
        <HorarioModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          medicamento={selectedMed}
          horarios={horarios}
          setHorarios={setHorarios}
        />
      )}

      <Footer />
    </div>
  );
}
