//Implies functions and methods that are commonly used across different parts of the application.
export const BUTTON_STYLES = {
  addedToFavorites: "bg-green-500",
  alreadyAdded: "bg-gray-500",
};

export const BUTTON_TEXTS = {
  addedToFavorites: "Added to Favorites",
  alreadyAdded: "Already in Favorites",
};

const storage = {
  getFavorites: () => JSON.parse(localStorage.getItem("favorites")) || [],
  setFavorites: (favorites) =>
    localStorage.setItem("favorites", JSON.stringify(favorites)),
};

export const addToFavorites = (movie) => {
  let favorites = storage.getFavorites();
  const button = document.querySelector(`[data-id="${movie.id}"]`);
  if (favorites.some((fav) => fav.id === movie.id)) {
    button.classList.add(BUTTON_STYLES.alreadyAdded);
    button.textContent = BUTTON_TEXTS.alreadyAdded;
  } else {
    favorites.unshift(movie);
    storage.setFavorites(favorites);
    button.classList.add(BUTTON_STYLES.addedToFavorites);
    button.textContent = BUTTON_TEXTS.addedToFavorites;
  }
};

export const initializeButtons = () => {
  let favorites = storage.getFavorites();
  favorites.forEach((fav) => {
    const button = document.querySelector(`[data-id="${fav.id}"]`);
    if (button) {
      button.classList.add(BUTTON_STYLES.addedToFavorites);
      button.textContent = BUTTON_TEXTS.addedToFavorites;
    }
  });
};
