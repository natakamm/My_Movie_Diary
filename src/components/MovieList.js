// src/components/MovieList.js
import React, { useEffect, useState } from "react";
import { fetchMovies } from "../api/api.js";
import { displayMovies } from "../api/ui.js";

const MovieList = ({ onAddToFavorites }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesData = await fetchMovies();
        setMovies(displayMovies(moviesData));
      } catch (error) {
        console.error(error);
      }
    };

    getMovies();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="movie-card bg-white p-4 rounded shadow border-primary border-2"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto mb-4"
          />
          <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
          <p className="text-gray-700 mb-2 flex-grow">{movie.overview}</p>
          <button
            onClick={() => onAddToFavorites(movie)}
            className="add-to-favorites text-white p-2 rounded mt-2 bg-red-500"
          >
            Add to Favorites
          </button>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
