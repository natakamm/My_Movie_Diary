import { createCard } from "./ui";
import { getFavorites } from "./api";

//COMMON
//before this function was wrapped around the whole code
const retrieveData = () => {
  document.addEventListener("DOMContentLoaded", () => {
    displayJournalEntries();
  });
};

//UI or COMMON
//this function is now significantly smaller
//declared function in variable const
//includes the creation of a card function, which includes the adding event listeners function
const displayJournalEntries = () => {
  const entries = getFavorites(); //entries is the data retrieved and parsed to array from string in getFavotires function
  const container = document.getElementById("container"); //grab container by id

  container.innerHTML = ""; //empty existing HTML

  //for eachLoop now contains the function for the creation of a card
  entries.forEach((entry, index) => {
    //for each method to go over each object in the array entries
    const card = createCard(entry, index);
    container.appendChild(card);
  });
};

retrieveData();

//declared all functions in variables with cohesive and self-explanatory names
//split up larger functions into many smaller ones
//creating a card became its own function and called in the displayJournalEntries function
//added all eventListeners in functions declared in variables and added those in a new variable for all event listeners
//retrieveData is now only the top rows long and calls the displayJou
