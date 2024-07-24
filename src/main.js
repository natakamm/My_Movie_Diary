const fetchMovies = async (query = "") => {
  const apiKey = "560028d00962052a3fbda82355f3c7af";
  const url = query
    ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

const displayMovies = (movies) => {
  const moviesList = document.getElementById("moviesList");
  moviesList.innerHTML = "";
  movies.forEach((movie) => {
    console.log(movie);
    const movieCard = document.createElement("div");
    movieCard.className =
      "movie-card bg-white p-4 rounded shadow border-primary border-2";
    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-auto mb-4">
      <h2 class="text-lg font-bold mb-2">${movie.title}</h2>
      <p class="text-gray-700 mb-2 flex-grow">${movie.overview}</p>
      <button class="add-to-favorites text-white p-2 rounded mt-2" data-id="${movie.id}" data-title="${movie.title}" data-poster="${movie.poster_path}" data-overview="${movie.overview}">Add to Favorites</button>
    `;
    moviesList.appendChild(movieCard);
  });

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

const addToFavorites = (movie) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (favorites.some((fav) => fav.id === movie.id)) {
    const button = document.querySelector(`[data-id="${movie.id}"]`);
    button.classList.add("bg-gray-500");
    button.textContent = "Already in Favorites";
  } else {
    favorites.unshift(movie);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    const button = document.querySelector(`[data-id="${movie.id}"]`);
    button.classList.add("bg-green-500");
    button.textContent = "Added to Favorites";
  }
};

const initializeButtons = () => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.forEach((fav) => {
    const button = document.querySelector(`[data-id="${fav.id}"]`);
    if (button) {
      button.classList.add("bg-green-500");
      button.textContent = "Added to Favorites";
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  fetchMovies().then(displayMovies);

  const searchForm = document.getElementById("searchForm");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchInput = document.getElementById("searchInput").value;
    fetchMovies(searchInput).then(displayMovies);
  });
});
