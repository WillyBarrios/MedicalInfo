import React, { useState, useEffect } from "react";
import { useMedicamentos } from "./useMedicamentos";

const GOOGLE_API_KEY = "AIzaSyCxHG24S6FNY6aAXaYC-EM1btJ3BeUenQ0";
const GOOGLE_CX = "6734edfb6475a40a3";

async function fetchGoogleImage(query) {
  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&searchType=image&q=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    if (json.items && json.items.length > 0) {
      return json.items[0].link;
    }
  // eslint-disable-next-line no-unused-vars
  } catch (e) { /* empty */ }
  return "https://placehold.co/150x150?text=Sin+Imagen";
}

export default function Cards() {
  const [nombre, setNombre] = useState("");
  const { data, loading, error, fetchMedicamentos } = useMedicamentos(nombre);
  const [images, setImages] = useState({});
  const [imageLoading, setImageLoading] = useState({});

  useEffect(() => {
    if (data && data.resultados && data.resultados.length > 0) {
      data.resultados.forEach(med => {
        const hasImage = med.foto && med.foto.endsWith('.jpg');
        if (!hasImage && !images[med.nregistro] && !imageLoading[med.nregistro]) {
          setImageLoading(prev => ({ ...prev, [med.nregistro]: true }));
          fetchGoogleImage(med.nombre).then(url => {
            setImages(prev => ({ ...prev, [med.nregistro]: url }));
            setImageLoading(prev => ({ ...prev, [med.nregistro]: false }));
          });
        }
      });
    }
    // eslint-disable-next-line
  }, [data]);

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchMedicamentos();
  };

  return (
    <div>
      <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Buscar medicamento..."
        />
        <button type="submit">Buscar</button>
      </form>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {data && data.resultados && data.resultados.length > 0 ? (
          data.resultados.map(med => {
            const hasImage = med.foto && med.foto.endsWith('.jpg');
            const imageSrc = hasImage ? med.foto : images[med.nregistro] || "https://placehold.co/150x150?text=Sin+Imagen";

            return (
              <div key={med.nregistro} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, width: 250 }}>
                {imageLoading[med.nregistro] ? (
                  <div style={{ width: '100%', height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>Cargando imagen...</span>
                  </div>
                ) : (
                  <img src={imageSrc} alt={med.nombre} style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 4 }} />
                )}
                <h3>{med.nombre}</h3>
                <p><b>ID:</b> {med.nregistro}</p>
                <p><b>Vía de administración:</b> {med.formaFarmaceutica ? med.formaFarmaceutica.nombre : "-"}</p>
                <p><b>Laboratorio:</b> {med.labcomercializador ? med.labcomercializador: "-"}</p>
              </div>
            );
          })
        ) : (
          <p>No hay resultados.</p>
        )}
      </div>
    </div>
  );
}
