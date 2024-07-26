export const fetchMovies = async (query = "") => {
  const apiKey = process.env.TMDB_API_KEY;
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

//STORAGE
//before it was incooperated in displayJournalEntries
//function that retrieves array from localstorage or returns an empty array if there are no data
//It parses the retrieved string data into a JavaScript array using JSON.parse
export const getFavorites = () => {
  const dataInStorage = localStorage.getItem("favorites");
  return dataInStorage ? JSON.parse(dataInStorage) : [];
};

//STORAGE
//declared function in const variable instead of normal function STORAGE
export const storeNotes = (index, input) => {
  const storedData = getFavorites();
  if (storedData[index]) {
    storedData[index].note = input; // Add new property 'note' with the input value
    localStorage.setItem("favorites", JSON.stringify(storedData));
    displayJournalEntries(); // Refresh the display after storing the note
  }
};

//STORAGE
//created variable to declare function STORAGE
export const deleteItem = (index) => {
  //get array in storage
  const entries = getFavorites(); //parse it to array JS
  entries.splice(index, 1); //use slice method to remove the index item, 1 stands for the continuation of slice
  localStorage.setItem("favorites", JSON.stringify(entries)); //save new spliced array in srting form in the entries array in localstorage
  displayJournalEntries(); //display the new localSTotage
};
