export const fetchMovies = async (query = "") => {
  const apiKey = config.TMDB_API_KEY;
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
    throw error; // Re-throw to handle at the call site
  }
};
