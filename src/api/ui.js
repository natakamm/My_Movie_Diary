// src/ui.js
import { storeNotes, deleteItem } from "./api";

export const displayMovies = (movies) => {
  return movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    overview: movie.overview,
  }));
};

export const createCard = (
  entry,
  index,
  handleRemove,
  handleToggleNote,
  handleSubmit
) => {
  return (
    <div
      key={index}
      className="group flex-grow flex flex-col justify-between border-2 rounded-2xl border-primary p-5 transition-all duration-300 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)] hover:bg-rose-100 hover:border-transparent"
    >
      <div>
        <h2 className="text-xl text-center font-bold mb-5">{entry.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${entry.poster_path}`}
          alt={entry.title}
          className="h-auto mb-4 self-center"
        />
        <p className="text-black mb-4">{entry.overview}</p>
      </div>
      <div className="flex flex-col">
        <button
          onClick={() => handleRemove(index)}
          className="remove-btn bg-secondary text-white py-2 px-8 m-2 rounded-lg transition-all duration-300 group-hover:bg-primary"
        >
          Remove
        </button>
        <button
          onClick={() => handleToggleNote()}
          className="add-btn bg-orange-300 text-white py-2 px-8 m-2 rounded-lg transition-all duration-300 group-hover:bg-pink-400"
        >
          Add Note
        </button>
      </div>
      <div className="inputFields flex-col" style={{ display: "none" }}>
        <input
          type="text"
          placeholder="Enter note"
          className="input pt-2 pb-6 px-4 m-2 border-2 border-secondary rounded-lg bg-white"
        />
        <button
          onClick={() => handleSubmit(index)}
          className="submit-btn text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br dark:focus:ring-pink-800 rounded-lg py-2 px-8 m-2"
        >
          Submit Note
        </button>
      </div>
    </div>
  );
};
