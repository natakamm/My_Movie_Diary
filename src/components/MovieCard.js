import React from "react";

const MovieCard = ({
  movie,
  onAddToFavorites,
  onRemove,
  onToggleNote,
  isNoteVisible,
  onSubmitNote,
}) => {
  const handleAddToFavorites = () => {
    onAddToFavorites(movie);
  };

  const handleSubmitNote = (event) => {
    event.preventDefault();
    const note = event.target.elements.note.value;
    if (note.trim()) {
      onSubmitNote(note);
    }
  };

  return (
    <div className="movie-card bg-white p-4 rounded shadow border-primary border-2 relative">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto mb-4 rounded"
      />
      <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
      <p className="text-gray-700 mb-2">{movie.overview}</p>
      <button
        className="add-to-favorites text-white p-2 rounded mt-2"
        onClick={handleAddToFavorites}
      >
        Add to Favorites
      </button>

      <button
        className="add-btn bg-orange-300 text-white py-2 px-8 m-2 rounded-lg"
        onClick={onToggleNote}
      >
        Add Note
      </button>

      {isNoteVisible && (
        <form className="inputFields flex-col" onSubmit={handleSubmitNote}>
          <input
            type="text"
            name="note"
            placeholder="Enter note"
            className="input pt-2 pb-6 px-4 m-2 border-2 border-secondary rounded-lg bg-white"
          />
          <button
            type="submit"
            className="submit-btn text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 rounded-lg py-2 px-8 m-2"
          >
            Submit Note
          </button>
        </form>
      )}
    </div>
  );
};

export default MovieCard;
