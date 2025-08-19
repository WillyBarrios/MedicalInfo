import "../estilos/hospitales.css";
import React, { useEffect, useState } from "react";




const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY_MAP;
// Coordenadas aproximadas de Puerto Barrios, Izabal, Guatemala
const LOCATION = { lat: 15.7306, lng: -88.5926 };
const RADIUS = 25000; // 25km
const TYPES = ["hospital", "pharmacy", "doctor", "clinic"];

export default function Hospitales() {
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLugares() {
      setLoading(true);
      setError(null);
      try {
        let allResults = [];
        for (const type of TYPES) {
          const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${LOCATION.lat},${LOCATION.lng}&radius=${RADIUS}&type=${type}&key=${GOOGLE_API_KEY}&language=es`;
          const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
          const data = await res.json();
          if (Array.isArray(data.results)) {
            allResults = allResults.concat(data.results);
          }
        }
        // Elimina duplicados por place_id
        const unique = Object.values(allResults.reduce((acc, curr) => {
          acc[curr.place_id] = curr;
          return acc;
        }, {}));
        setLugares(unique);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Error al buscar lugares en Google Maps");
      } finally {
        setLoading(false);
      }
    }
    fetchLugares();
  }, []);

  return (
    <div className="hospitales-container">
      <h2>Hospitales, Farmacias y Clínicas en Izabal, Guatemala</h2>
      {loading && <p>Cargando lugares...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {!loading && !error && lugares.length === 0 && <p>No se encontraron lugares.</p>}
      <ul>
        {lugares.slice(0, 10).map((lugar) => {
          const address = lugar.vicinity || lugar.formatted_address || "";
          const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
          return (
            <li key={lugar.place_id}>
              <b>{lugar.name}</b><br/>
              {address ? (
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={{color: '#2a4d69', textDecoration: 'underline'}}>
                  {address}
                </a>
              ) : null}
              <br/>
              {lugar.types && <span style={{fontSize: '0.9em', color: '#888'}}>Tipo: {lugar.types.join(', ')}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
