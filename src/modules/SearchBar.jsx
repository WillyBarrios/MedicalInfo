import React, { useState } from "react";
import "../estilos/searchbar.css";

export default function SearchBar({ onSearch, onClose }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <div className="searchbar-overlay">
      <form className="searchbar-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar medicamento..."
          value={query}
          onChange={handleInputChange}
          autoFocus
        />
        <button type="submit">Buscar</button>
        {onClose && (
          <button type="button" className="close-btn" onClick={onClose}>
            ✖
          </button>
        )}
      </form>
    </div>
  );
}
