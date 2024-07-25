import { addToFavorites, initializeButtons } from "./common.js";
import { storeNotes, deleteItem } from "./api.js";

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

//UI
//variable with function declaration for creating a card. before it was in the forEach
//entry: Provides the data to populate the card
//index: Provides a unique identifier for each card, allowing event listeners to perform actions on the correct data entries
//the function is the only one that needs to return something (the newly created card element) because its the only one whose function is to create something to be displayed in the DOM
//Thee other functions dont return anything cause they only perform actions or apply event listeners to existing elements
export const createCard = (entry, index) => {
  const card = document.createElement("div");
  card.className =
    "group flex-grow flex flex-col justify-between border-2 rounded-2xl border-primary p-5 transition-all duration-300 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)] hover:bg-rose-100 hover:border-transparent";
  card.innerHTML = `
            <div>
        <h2 class="text-xl text-center font-bold mb-5">${entry.title}</h2>
        <img src="https://image.tmdb.org/t/p/w500${entry.poster_path}" alt="${entry.title}" class="h-auto mb-4 self-center"> 
        <p class="text-black mb-4">${entry.overview}</p>
      </div>
      <div class="flex flex-col">
        <button class="remove-btn bg-secondary text-white py-2 px-8 m-2 rounded-lg transition-all duration-300 group-hover:bg-primary">Remove</button>
        <button class="add-btn bg-orange-300 text-white py-2 px-8 m-2 rounded-lg transition-all duration-300 group-hover:bg-pink-400">Add Note</button>
      </div>
      <div class="inputFields flex-col" style="display: none;">
        <input type="text" placeholder="Enter note" class="input pt-2 pb-6 px-4 m-2 border-2 border-secondary rounded-lg bg-white">
        <button class="submit-btn text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br  dark:focus:ring-pink-800 rounded-lg py-2 px-8 m-2 ">Submit Note</button>
      </div>
    `;

  addEventListenersToButtons(card, index);

  return card;
};

//UI
//put all event listeners for buttons in one function declared in a variable called addEventListenersToButtons
export const addEventListenersToButtons = (card, index) => {
  eventListenerForSubmit(card, index);
  eventListenerRemoveButton(card, index);
  eventListenerToggleNote(card);
};

//UI
//created a variable to declare a function for adding event listener to submit Button. Before it was not a function at all
//eventListenerForSubmit(card, index): This function needs both the card element and the index because it updates the note for the specific entry at index in the local storage
const eventListenerForSubmit = (card, index) => {
  const submitButton = card.querySelector(".submit-btn");
  const inputLine = card.querySelector(".input");

  submitButton.addEventListener("click", () => {
    const input = inputLine.value;
    if (input.trim() !== "") {
      storeNotes(index, input);
      inputLine.value = ""; // Clear the input field after submission.
      card.querySelector(".inputFields").style.display = "none";
    }
  });
};

//UI
//declared function in a variable. Before it was not a function at all
//eventListenerToggleNote(card): This function only needs the card element because it toggles the visibility of the note input field within the card. It does not need to know the index
const eventListenerToggleNote = (card) => {
  const addButton = card.querySelector(".add-btn");
  const inputField = card.querySelector(".inputFields");

  addButton.addEventListener("click", () => {
    toggleField(inputField);
  });
};

//UI
//declared function in a variable for the toggling of the input field
//used ternary operator instead of if else statement
const toggleField = (inputField) => {
  inputField.style.display =
    inputField.style.display === "none" ? "flex" : "none";
};

//UI
//declared a function in a variable for the event listener of remove button
//eventListenerRemoveButton(card, index): This function needs both the card element and the index because it removes the specific entry at index from the local storage
const eventListenerRemoveButton = (card, index) => {
  const removeBtn = card.querySelector(".remove-btn");
  removeBtn.addEventListener("click", () => {
    deleteItem(index); //function to delete item at specific index
  });
};
