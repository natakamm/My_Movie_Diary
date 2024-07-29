// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import logoWhite from "../images/Logo White.png";

const Header = () => {
  return (
    <header className="bg-gradient-primary-secondary text-white p-4 mb-4">
      <div className="absolute top-0 left-0 p-2">
        <img src={logoWhite} alt="Heart Logo" className="h-8" />
      </div>
      <div className="mx-auto p-4 flex justify-between items-center">
        <div>
          <h2 className="w-full m-0 py-3 text-4xl">Welcome.</h2>
          <h3 className="text-xl font-medium">
            Millions of movies, TV shows and people to discover. Explore now.
          </h3>
        </div>
        <nav className="space-x-4">
          <Link
            to="/"
            className="text-white font-extra-bold hover:text-gray-900"
          >
            Home
          </Link>
          <Link
            to="/journal"
            className="text-white font-extra-bold hover:text-gray-900"
          >
            Journal
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
