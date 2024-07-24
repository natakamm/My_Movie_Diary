export const handleError = (error) => {
  console.error("An error occurred:", error);
  displayErrorMessage("An unexpected error occurred. Please try again later.");
};

//Display error message to users
export const displayErrorMessage = (message) => {
  const moviesList = document.getElementById("moviesList");
  if (moviesList) {
    moviesList.innerHTML = `<p class="text-red-500">${message}</p>`;
  }
};
