// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage.js";
import Favorites from "./Favorites.js";
import Navbar from "./Navbar.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { getFavorites } from "../api/api.js";

const App = () => {
  const [favorites, setFavorites] = useState(getFavorites());

  const handleAddToFavorites = (movie) => {
    const updatedFavorites = [...favorites, movie];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <Router>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={<HomePage onAddToFavorites={handleAddToFavorites} />}
          />
          <Route path="/journal" element={<Favorites />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
