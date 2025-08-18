/* eslint react-refresh/only-export-components: off */
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const FavoritesContext = createContext(null);

const LS_KEY = "favorites";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const addFavorite = useCallback((med) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.nregistro === med.nregistro)) return prev;
      return [...prev, med];
    });
  }, []);

  const removeFavorite = useCallback((nregistro) => {
    setFavorites((prev) => prev.filter((m) => m.nregistro !== nregistro));
  }, []);

  const isFavorite = useCallback((nregistro) => favorites.some((m) => m.nregistro === nregistro), [favorites]);

  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite, isFavorite }),
    [favorites, addFavorite, removeFavorite, isFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
