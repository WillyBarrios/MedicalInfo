import React, { useState } from "react";
import Navbar from "./modules/Navbar";
import Cards from "./modules/Cards";
import Hospitales from "./modules/Hospitales";
import SearchBar from "./modules/SearchBar";
import "./App.css";
import Footer from './modules/Footer'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
function useAppTour() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      const driverObj = driver({
        prevBtnText: "Anterior",
        nextBtnText: "Siguiente",
        finishBtnText: "Finalizar",
        doneBtnText: "Cerrar",
        allowClose: true,
        animate: true,
        showProgress: true,
        showButtons: ["next", "previous", "close"],
        steps: [
          {
            element: "#navbar-main",
            popover: {
              title: "Barra de navegación",
              description: "Con esta barra puedes navegar por las diferentes secciones de la aplicación y realizar tu primera búsqueda.",
              position: "right",
            },
          },
          {
            element: "#hospitales-main",
            popover: {
              title: "Hospitales",
              description: "Aquí puedes ver la lista de hospitales, centros asistenciales y farmacias disponibles cerca de ti.",
              position: "right",
            },
          },
          {
            element: "#cards-main",
            popover: {
              title: "Resultados de búsqueda",
              description: "Aquí se muestran los resultados de tu búsqueda.",
              position: "right",
            },
          },
          {
            element: "#footer-main",
            popover: {
              title: "Pie de página",
              description: "Aquí se muestran los enlaces de interés y la información de contacto.",
              position: "right",
            },
          },
        ],
      });
      driverObj.drive();
    }
  }, [location]);
}

function App() {
  useAppTour();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");



  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowSearchBar(false); // Cierra la barra tras buscar
  };

  return (
    <div>
      <div className="app-container">
        <div id="navbar-main">
          <Navbar onSearchIconClick={() => setShowSearchBar(true)} />
        </div>
        {showSearchBar && (
          <SearchBar onSearch={handleSearch} onClose={() => setShowSearchBar(false)} />
        )}
        <div className="content-wrapper">
          <div className="content-inner">
            {searchQuery.trim() === "" ? (
              <div id="hospitales-main"><Hospitales /></div>
            ) : (
              <div id="cards-main"><Cards searchQuery={searchQuery} /></div>
            )}
          </div>
        </div>
      </div>
      <div id="footer-main">
        <Footer />
      </div>
    </div>
  );

}

export default App;
