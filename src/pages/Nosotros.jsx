import React from "react";
import Navbar from "../Navbar.jsx";
import "../estilos/nosotros.css";

export default function Nosotros() {
  return (
    <>
      <Navbar />
      <section className="about-container">
        <h2 className="about-title">Nosotros</h2>
        <div className="about-grid">
          <article className="about-card">
            <div className="about-icon" aria-hidden>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7h2a5 5 0 0 1 10 0h2c0-3.866-3.134-7-7-7z"/>
              </svg>
            </div>
            <h3>Quiénes somos</h3>
            <p>
              Somos un equipo dedicado a facilitar el acceso a información clara y confiable sobre medicamentos, 
              acercando la tecnología a la salud para impactar positivamente en la vida de las personas.
            </p>
          </article>
          <article className="about-card">
            <div className="about-icon" aria-hidden>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm1-13h-2v5l4.28 2.54.72-1.21-3-1.79Z"/>
              </svg>
            </div>
            <h3>Misión</h3>
            <p>
              Proveer información precisa y accesible sobre medicamentos, ayudando a tomar decisiones informadas de 
              forma rápida, segura y gratuita.
            </p>
          </article>
          <article className="about-card">
            <div className="about-icon" aria-hidden>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7Zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Zm0-8a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z"/>
              </svg>
            </div>
            <h3>Visión</h3>
            <p>
              Convertirnos en la plataforma de referencia en información de medicamentos en habla hispana, 
              promoviendo el uso responsable y la salud digital.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
