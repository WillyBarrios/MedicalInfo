import React, { useState } from "react";
import Navbar from "./modules/Navbar";
import Cards from "./modules/Cards";
import SearchBar from "./modules/SearchBar";
import "./App.css";
import Footer from './modules/Footer'

function App() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [count, setCount] = useState(0)


  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowSearchBar(false); // Cierra la barra tras buscar
  };

  return (
    <div>
      <div className="app-container">
        <Navbar onSearchIconClick={() => setShowSearchBar(true)} />
        {showSearchBar && (
          <SearchBar onSearch={handleSearch} onClose={() => setShowSearchBar(false)} />
        )}
        <div className="content-wrapper">
          <div className="content-inner">
            <Cards searchQuery={searchQuery} />
          </div>
        </div>
      </div>
     <Footer /> 
    </div>
  );
 
}

export default App;
