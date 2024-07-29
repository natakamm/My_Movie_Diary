// src/components/HomePage.js
import React, { useState } from "react";
import MovieList from "./MovieList";

const HomePage = ({ onAddToFavorites }) => {
  return (
    <div className="p-6">
      <div class="title backdrop-wrapper -loaded">
        <h2 class="w-full m-0 p-0 text-4xl">Movie Journal</h2>
        <h3 class="text-xl font-medium">
          Discover and keep track of your cinematic journey with MovieJot, your
          personalized movie journal. Here, you can favorite your top picks, jot
          down your thoughts, and explore a curated collection of films. Whether
          you're a casual viewer or a dedicated cinephile, MovieJot is your
          space to document, share, and celebrate your love for movies. Join our
          community and start your movie adventure today!
        </h3>
        <section class="mb-4">
          <form id="searchForm" class="flex items-center justify-center">
            <input
              type="text"
              id="searchInput"
              class="w-[667px] h-[41px] p-2 border border-gray-300 rounded-[25px]"
              placeholder="Search for a movie..."
            />
            <button
              type="submit"
              class="p-2 bg-blue-500 text-white rounded-r-md"
            >
              Search
            </button>
          </form>
        </section>
      </div>

      <MovieList onAddToFavorites={onAddToFavorites} />
    </div>
  );
};

export default HomePage;
