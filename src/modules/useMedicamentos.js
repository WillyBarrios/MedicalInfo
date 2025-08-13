import { useState } from "react";

export function useMedicamentos(nombre) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMedicamentos() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://cima.aemps.es/cima/rest/medicamentos?nombre=${encodeURIComponent(nombre)}`);
      if (!response.ok) throw new Error("Error en la petición");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, fetchMedicamentos };
}
