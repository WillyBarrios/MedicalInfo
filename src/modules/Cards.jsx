import React, { useState, useEffect } from "react";
import { useMedicamentos } from "./useMedicamentos";
import { useFavorites } from "../context/FavoritesContext.jsx";
import "../estilos/cards.css";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GOOGLE_CX = import.meta.env.VITE_GOOGLE_CX;

// Construye URL válida desde campos de CIMA (foto o fotos[])
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
    // Evita PDFs u otros formatos no imagen
    const clean = path.split("?")[0].split("#")[0].toLowerCase();
    if (clean.endsWith(".jpg") || clean.endsWith(".jpeg") || clean.endsWith(".png")) {
      return path.startsWith("http") ? path : `${base}${path}`;
    }
  }
  return null;
}

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
    // silenciar
  }
  return null;
}

export default function Cards() {
  const [nombre, setNombre] = useState("");
  const { data, loading, error, fetchMedicamentos } = useMedicamentos(nombre);
  const [images, setImages] = useState({}); // map nregistro -> url google
  const [imageLoading, setImageLoading] = useState({}); // map nregistro -> boolean
  const { addFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (data && data.resultados && data.resultados.length > 0) {
      data.resultados.forEach((med) => {
        const cimaUrl = getCimaImageUrl(med);
        if (!cimaUrl && !images[med.nregistro] && !imageLoading[med.nregistro]) {
          setImageLoading((prev) => ({ ...prev, [med.nregistro]: true }));
          fetchGoogleImage(med.nombre).then((url) => {
            if (url) {
              setImages((prev) => ({ ...prev, [med.nregistro]: url }));
            }
            setImageLoading((prev) => ({ ...prev, [med.nregistro]: false }));
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchMedicamentos();
  };

  return (
    <div className="cards-container">
      <div className="search-box">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Buscar medicamento..."
            className="search-input"
          />
          <button type="submit" className="search-button">Buscar</button>
        </form>
      </div>
      
      {loading && <p className="loading-text">Cargando...</p>}
      {error && <p className="error-text">{error}</p>}
      
      <div className="results-container">
        {data && data.resultados && data.resultados.length > 0 ? (
          data.resultados.map((med) => {
            const cimaUrl = getCimaImageUrl(med);
            const imageSrc = cimaUrl || images[med.nregistro] || "https://placehold.co/250x150?text=Sin+imagen";
            const favorite = isFavorite(med.nregistro);
            return (
              <div key={med.nregistro} className="medicine-card">
                <button
                  className={`favorite-btn${favorite ? " active" : ""}`}
                  title={favorite ? "Ya en favoritos" : "Agregar a favoritos"}
                  onClick={() => {
                    if (!favorite) {
                      const resolvedImage = cimaUrl || images[med.nregistro] || null;
                      const medWithImage = { ...med, imageUrl: resolvedImage };
                      addFavorite(medWithImage);
                    }
                  }}
                  aria-label={`${favorite ? "Ya en" : "Agregar a"} favoritos: ${med.nombre}`}
                  disabled={favorite}
                >
                  {favorite ? "✓" : "+"}
                </button>
                {imageLoading[med.nregistro] && !cimaUrl && !images[med.nregistro] ? (
                  <div className="image-loading">
                    <span>Cargando imagen...</span>
                  </div>
                ) : (
                  <img
                    src={imageSrc}
                    alt={med.nombre}
                    className="medicine-image"
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/250x150?text=Sin+imagen"; }}
                  />
                )}
                <h3 className="medicine-title">{med.nombre}</h3>
                <p className="medicine-info"><b>ID:</b> {med.nregistro}</p>
                <p className="medicine-info"><b>Vía de administración:</b> {med.formaFarmaceutica ? med.formaFarmaceutica.nombre : "-"}</p>
                <p className="medicine-info"><b>Laboratorio:</b> {med.labcomercializador ? med.labcomercializador : "-"}</p>
              </div>
            );
          })
        ) : (
          <p className="no-results">No hay resultados.</p>
        )}
      </div>
    </div>
  );
}
