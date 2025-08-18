import { useState, useEffect } from "react";

export function useMedicamentos(nombre) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  async function fetchMedicamentos(customNombre) {
    const query = typeof customNombre === "string" ? customNombre : nombre;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://cima.aemps.es/cima/rest/medicamentos?nombre=${encodeURIComponent(query)}`);
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

  useEffect(() => {
    if (nombre && nombre.trim() !== "") {
      fetchMedicamentos(nombre);
    }
    // Si quieres limpiar resultados cuando el nombre está vacío, descomenta:
    // else setData(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nombre]);

  return { data, loading, error, fetchMedicamentos };
}
