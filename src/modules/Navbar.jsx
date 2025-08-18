
import React from "react";
import { Link } from "react-router-dom";
import "../estilos/navbar.css";
import logo from "../assets/img/logo.png";

export default function Navbar({ onSearchIconClick }) {
  const handleSearchClick = onSearchIconClick || (() => {});
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo" aria-label="Inicio">
          <img src={logo} alt="MedicalInfo logo" />
        </Link>
        <div className="navbar-buttons">
          <Link to="/" className="navbar-button">Medicalinfo</Link>
          <Link to="/dashboard" className="navbar-button">Dashboard</Link>
          <Link to="/nosotros" className="navbar-button">Nosotros</Link>
          <Link to="/Contacto" className="navbar-button">Contacto</Link>
        </div>
      </div>
      <div className="navbar-center">
        <span className="navbar-slogan">Informacion que cura</span>
      </div>
      <div className="navbar-right">
        <button onClick={handleSearchClick} className="search-button" title="Buscar">
          <span role="img" aria-label="Buscar" className="search-icon">🔍</span>
          <span className="search-text">Busca medicamento</span>
        </button>
      </div>
    </nav>
  );
}
