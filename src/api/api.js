// src/api.js
export const fetchMovies = async (query = "") => {
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
    if (!data.results || data.results.length === 0) {
      throw new Error("No results found.");
    }
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const getFavorites = () => {
  const dataInStorage = localStorage.getItem("favorites");
  return dataInStorage ? JSON.parse(dataInStorage) : [];
};

export const storeNotes = (index, input) => {
  const storedData = getFavorites();
  if (storedData[index]) {
    storedData[index].note = input;
    localStorage.setItem("favorites", JSON.stringify(storedData));
  }
};

export const deleteItem = (index) => {
  const entries = getFavorites();
  entries.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(entries));
};
