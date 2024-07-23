//before this function was wrapped around the whole code
const retrieveData = () => {
  document.addEventListener("DOMContentLoaded", () => {
    displayJournalEntries();
  });
};

//this function is now significantly smaller
//declared function in variable const
//includes the creation of a card function, which includes the adding event listeners function
const displayJournalEntries = () => {
  const dataInStorage = localStorage.getItem("favorites"); //get data from local storage
  if (dataInStorage) {
    const entries = JSON.parse(dataInStorage); //parse to array from string
    const container = document.getElementById("container"); //grab container by id

    container.innerHTML = ""; //empty existing HTML

    //for eachLoop now contains the function for the creation of a card
    entries.forEach((entry, index) => {
      //for each method to go over each object in the array entries
      const card = createCard(entry, index);
      container.appendChild(card);
    });
  }
};

//variable with function declaration for creating a card. before it was in the forEach
//entry: Provides the data to populate the card
//index: Provides a unique identifier for each card, allowing event listeners to perform actions on the correct data entries
//the function is the only one that needs to return something (the newly created card element) because its the only one whose function is to create something to be displayed in the DOM
//Thee other functions dont return anything cause they only perform actions or apply event listeners to existing elements
const createCard = (entry, index) => {
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

//put all event listeners for buttons in one function declared in a variable called addEventListenersToButtons
const addEventListenersToButtons = (card, index) => {
  eventListenerForSubmit(card, index);
  eventListenerRemoveButton(card, index);
  eventListenerToggleNote(card);
};

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

//declared function in const variable instead of normal function
const storeNotes = (index, input) => {
  const storedData = JSON.parse(localStorage.getItem("favorites")) || [];
  if (storedData[index]) {
    storedData[index].note = input; // Add new property 'note' with the input value
    localStorage.setItem("favorites", JSON.stringify(storedData));
    displayJournalEntries(); // Refresh the display after storing the note
  }
};

//declared function in a variable. Before it was not a function at all
//eventListenerToggleNote(card): This function only needs the card element because it toggles the visibility of the note input field within the card. It does not need to know the index
const eventListenerToggleNote = (card) => {
  const addButton = card.querySelector(".add-btn");
  const inputField = card.querySelector(".inputFields");

  addButton.addEventListener("click", () => {
    toggleField(inputField);
  });
};

//declared function in a variable for the toggling of the input field
const toggleField = (inputField) => {
  if (inputField.style.display === "none") {
    inputField.style.display = "flex";
  } else {
    inputField.style.display = "none";
  }
};

//declared a function in a variable for the event listener of remove button
//eventListenerRemoveButton(card, index): This function needs both the card element and the index because it removes the specific entry at index from the local storage
const eventListenerRemoveButton = (card, index) => {
  const removeBtn = card.querySelector(".remove-btn");
  removeBtn.addEventListener("click", () => {
    deleteItem(index); //function to delete item at specific index
  });
};

//created variable to declare function
const deleteItem = (index) => {
  const dataInStorage = localStorage.getItem("favorites"); //get array in storage
  if (dataInStorage) {
    const entries = JSON.parse(dataInStorage); //parse it to array JS
    entries.splice(index, 1); //use slice method to remove the index item, 1 stands for the continuation of slice
    localStorage.setItem("favorites", JSON.stringify(entries)); //save new spliced array in srting form in the entries array in localstorage
    displayJournalEntries(); //display the new localSTotage
  }
};

retrieveData();

//declared all functions in variables with cohesive and self-explanatory names
//split up larger functions into many smaller ones
//creating a card became its own function and called in the displayJournalEntries function
//added all eventListeners in functions declared in variables and added those in a new variable for all event listeners
//retrieveData is now only the top rows long and calls the displayJou
