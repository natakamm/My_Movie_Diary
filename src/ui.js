import { addToFavorites, initializeButtons } from "./common.js";

export const displayMovies = (movies, moviesList) => {
  moviesList.innerHTML = "";
  if (!movies || movies.length === 0) {
    moviesList.innerHTML = `<p class="text-red-500">No movies found.</p>`;
    return;
  }
  //Fragment for Batch DOM Updates: When appending multiple elements, use DocumentFragment to avoid multiple reflows and repaints.
  const fragment = document.createDocumentFragment();
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className =
      "movie-card bg-white p-4 rounded shadow border-primary border-2";
    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-auto mb-4">
      <h2 class="text-lg font-bold mb-2">${movie.title}</h2>
      <p class="text-gray-700 mb-2 flex-grow">${movie.overview}</p>
      <button class="add-to-favorites text-white p-2 rounded mt-2" data-id="${movie.id}" data-title="${movie.title}" data-poster="${movie.poster_path}" data-overview="${movie.overview}">Add to Favorites</button>
    `;
    fragment.appendChild(movieCard);
  });

  moviesList.appendChild(fragment);

  document.querySelectorAll(".add-to-favorites").forEach((button) => {
    button.addEventListener("click", (event) => {
      const movie = {
        id: event.target.dataset.id,
        title: event.target.dataset.title,
        poster_path: event.target.dataset.poster,
        overview: event.target.dataset.overview,
      };
      addToFavorites(movie);
    });
  });

  initializeButtons();
};
