import React from "react";
import Navbar from "../Navbar.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";
import "../estilos/cards.css";
import "../estilos/dashboard.css";

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

export default function Dashboard() {
  const { favorites, removeFavorite } = useFavorites();

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
            const imageSrc = cimaUrl || "https://placehold.co/250x150?text=Sin+imagen";
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
                  onError={(e) => {
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
