import { fetchMovies } from "./api.js";
import { displayMovies } from "./ui.js";
import { handleError } from "./errorHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  const moviesList = document.getElementById("moviesList");
  fetchMovies()
    .then((movies) => displayMovies(movies, moviesList))
    .catch(handleError);

  const searchForm = document.getElementById("searchForm");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchInput = document.getElementById("searchInput").value;
    fetchMovies(searchInput)
      .then((movies) => displayMovies(movies, moviesList))
      .catch(handleError);
  });
});
