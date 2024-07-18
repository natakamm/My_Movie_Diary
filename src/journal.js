const retrieveData = () => {
  document.addEventListener("DOMContentLoaded", () => {
    displayJournalEntries();
  });

  function displayJournalEntries() {
    const dataInStorage = localStorage.getItem("journalEntries"); //get data from local storage. IDK NAME
    if (dataInStorage) {
      const entries = JSON.parse(dataInStorage); //parse to array from string
      const container = document.getElementById("container"); //grab container by id

      container.innerHTML = ""; //empty existing HTML

      entries.forEach((entry) => {
        //for each method to go over each object in the array entries
        const card = document.createElement("div");
        card.className =
          "flex-grow flex flex-col justify-between border-2 rounded-2xl border-primary p-5";
        card.innerHTML = `
          <div>
            <h2 class="text-xl text-center font-bold mb-5">${entry.title}</h2>
            <img src="${entry.image}" alt="${entry.title}" class="h-52 mb-4 self-center">
          </div>
          <div>
            <p class="text-black mb-4">${entry.info}</p>
          </div>
          <button class="remove-btn bg-primary text-white py-2 px-10 mt-2 rounded-lg self-center"
      ">Remove</button>
        `;
        container.appendChild(card);
      });
    }
  }
};

retrieveData();
