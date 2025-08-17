

import React, { useState } from "react";
import Navbar from "./Navbar";
import Cards from "./modules/Cards";
import "./App.css";

function App() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div className="app-container">
      <Navbar onSearchIconClick={() => setShowSearchBar(true)} />
      <div className={`content-wrapper${showSearchBar ? " visible" : ""}`}>
        {showSearchBar && (
          <div className="content-inner">
            <Cards />
          </div>
        )}
      </div>
    </div>

import Contacto from "./contacto.jsx"; // Ajusta la ruta si es distinta
import "./estilos/contacto.css"; // Tu archivo CSS
import Footer from "./modules/footer.jsx"; // Asegúrate de tener este componente creado

function App() {
  return (
    <>
      <Contacto />
      <Footer />
    </>

  );
}

export default App;
