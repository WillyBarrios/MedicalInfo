import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../estilos/navbar.css";
import logo from "../assets/img/logo.png";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";

export default function Navbar({ onSearchIconClick }) {
  const handleSearchClick = onSearchIconClick || (() => {});
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Izquierda: logo + menú */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo" aria-label="Inicio">
          <img src={logo} alt="MedicalInfo logo" />
        </Link>

        {/* Botón hamburguesa */}
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>

        {/* Menú de enlaces */}
        <div className={`navbar-buttons ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="navbar-button">Medicalinfo</Link>
          <Link to="/dashboard" className="navbar-button">Dashboard</Link>
          <Link to="/nosotros" className="navbar-button">Nosotros</Link>
          <Link to="/contacto" className="navbar-button">Contacto</Link>
        </div>
      </div>

      {/* Centro: eslogan */}
      <div className="navbar-center">
        <span className="navbar-slogan">Informacion que cura</span>
        
      </div>

      {/* Derecha: solo la lupa */}
      {/* Derecha: lupa con texto */}
<div className="navbar-right">
  <button
    type="button"
    onClick={handleSearchClick}
    className="search-button"
    title="Buscar"
    aria-label="Buscar"
  >
    <FiSearch size={18} style={{ marginRight: "6px" }} />
    Busca medicamento
  </button>
</div>

    </nav>
  );
}
