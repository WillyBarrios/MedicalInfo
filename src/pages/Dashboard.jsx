import React, { useEffect, useState } from "react";
import Navbar from "../Navbar.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";
import "../estilos/cards.css";
import "../estilos/dashboard.css";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
    prevBtnText: 'Anterior',
    nextBtnText: 'Siguiente',
    finishBtnText: 'Finalizar',
    doneBtnText: 'Cerrar',
    allowClose: true,
    animate: true,
    showProgress: true,
    showButtons: ['next', 'previous', 'close'],
    steps: [
        {
            element: '.dashboard-title',
            popover: {
                title: 'Listado de favoritos',
                description: 'Aqui se cargaran los medicamentos que has marcado como favoritos.',
                position: 'right'
            }
        },
        {
            element: '.medicine-title',
            popover: {
                title: 'Titulo de medicamento',
                description: 'Titulo del medicamento seleccionado.',
                position: 'right'
            }
        },
        {
            element: '.medicine-info',
            popover: {
                title: 'Información del medicamento',
                description: 'Aqui se mostrara la información detallada del medicamento seleccionado.',
                position: 'right'
            }
        },
        {
            element: '.medicine-card',
            popover: {
                title: 'Medicamento',
                description: 'Aqui se mostrara la tarjeta del medicamento seleccionado.',
                position: 'right'
            }
        },
        {
            element: '.favorite-btn.active',
            popover: {
                title: 'Boton de favoritos',
                description: 'Aqui se mostrara el estado del medicamento como favorito.',
                position: 'right'
            }
        },
        {
            element: '#terminamos',
            popover: {
                title: 'Terminamos',
                description: 'Hemos llegado al final de nuestra presentación sobre el dashboard.',
                position: 'left'
            }
        }
    ]
});
driverObj.drive();
function getCimaImageUrl(med) {
  const base = "https://cima.aemps.es/cima";
  const candidates = [];
  if (med.foto) candidates.push(med.foto);
  if (Array.isArray(med.fotos)) {
    med.fotos.forEach((f) => {
      if (f && typeof f === "object" && f.url) candidates.push(f.url);
      else if (typeof f === "string") candidates.push(f);
    });
  }
  for (const raw of candidates) {
    if (typeof raw !== "string" || raw.length === 0) continue;
    const path = raw;
    const clean = path.split("?")[0].split("#")[0].toLowerCase();
    if (clean.endsWith(".jpg") || clean.endsWith(".jpeg") || clean.endsWith(".png")) {
      return path.startsWith("http") ? path : `${base}${path}`;
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
    if (json.items && json.items.length > 0) {
      return json.items[0].link;
    }
  } catch {
    // ignore
  }
  return null;
}

export default function Dashboard() {
  const { favorites, removeFavorite } = useFavorites();
  const [imageMap, setImageMap] = useState({});

  useEffect(() => {
    const initial = {};
    favorites.forEach((m) => {
      if (m.imageUrl) initial[m.nregistro] = m.imageUrl;
    });
    setImageMap((prev) => ({ ...initial, ...prev }));
  }, [favorites]);

  return (
    <>
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
                <p className="medicine-info"><b>Vía de administración:</b> {med.formaFarmaceutica ? med.formaFarmaceutica.nombre : "-"}</p>
                <p className="medicine-info"><b>Laboratorio:</b> {med.labcomercializador ? med.labcomercializador : "-"}</p>
              </div>
            );
          })}
        </div>
      )}
      </div>
    </>
  );
}
