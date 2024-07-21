const retrieveData = () => {
  document.addEventListener("DOMContentLoaded", () => {
    displayJournalEntries();
  });

  function displayJournalEntries() {
    const dataInStorage = localStorage.getItem("favorites"); //get data from local storage. IDK NAME
    if (dataInStorage) {
      const entries = JSON.parse(dataInStorage); //parse to array from string
      const container = document.getElementById("container"); //grab container by id

      container.innerHTML = ""; //empty existing HTML

      entries.forEach((entry, index) => {
        console.log(entry);
        //for each method to go over each object in the array entries
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

        container.appendChild(card);

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

        function storeNotes(index, input) {
          const storedData =
            JSON.parse(localStorage.getItem("favorites")) || [];
          if (storedData[index]) {
            storedData[index].note = input; // Add new property 'note' with the input value.
            localStorage.setItem("favorites", JSON.stringify(storedData));
            displayJournalEntries(); // Refresh the display after storing the note.
          }
        }

        const addButton = card.querySelector(".add-btn");
        const inputField = card.querySelector(".inputFields");

        addButton.addEventListener("click", () => {
          toggleField(inputField);
        });

        function toggleField(inputField) {
          if (inputField.style.display === "none") {
            inputField.style.display = "flex";
          } else {
            inputField.style.display = "none";
          }
        }

        const removeBtn = card.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
          deleteItem(index); //function to delete item at specific index
        });
      });
    }
  }
  function deleteItem(index) {
    const dataInStorage = localStorage.getItem("favorites"); //get array in storage
    if (dataInStorage) {
      const entries = JSON.parse(dataInStorage); //parse it to array JS
      entries.splice(index, 1); //use slice method to remove the index item, 1 stands for the continuation of slice
      localStorage.setItem("favorites", JSON.stringify(entries)); //save new spliced array in srting form in the entries array in localstorage
      displayJournalEntries(); //display the new localSTotage
    }
  }
};
retrieveData();
