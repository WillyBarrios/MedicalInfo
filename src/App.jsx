

import React, { useState } from "react";
import Navbar from "./Navbar";
import Cards from "./modules/Cards";
import "./App.css";
import Footer from './modules/Footer'

function App() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [count, setCount] = useState(0)


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
  );
   <Footer />
}

export default App;
