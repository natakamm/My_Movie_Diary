import { fetchMovies } from "./api.js";
import { displayMovies } from "./ui.js";
import { addToFavorites, initializeButtons } from "./common.js";

document.addEventListener("DOMContentLoaded", () => {
  const moviesList = document.getElementById("moviesList");
  fetchMovies().then((movies) => displayMovies(movies, moviesList));

  const searchForm = document.getElementById("searchForm");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchInput = document.getElementById("searchInput").value;
    fetchMovies(searchInput).then((movies) =>
      displayMovies(movies, moviesList)
    );
  });
});
