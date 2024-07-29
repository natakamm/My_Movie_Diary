// src/components/Favorites.js
import React, { useState, useEffect } from "react";
import { getFavorites, storeNotes, deleteItem } from "../api/api.js";
import { createCard } from "../api/ui.js";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [showInput, setShowInput] = useState(null);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (index) => {
    deleteItem(index);
    setFavorites(getFavorites());
  };

  const handleToggleNote = (index) => {
    setShowInput(index === showInput ? null : index);
  };

  const handleSubmit = (index) => {
    const inputField = document.querySelector(`.input[data-index="${index}"]`);
    const note = inputField.value;
    storeNotes(index, note);
    setFavorites(getFavorites());
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {favorites.map((entry, index) =>
        createCard(
          entry,
          index,
          () => handleRemove(index),
          () => handleToggleNote(index),
          () => handleSubmit(index)
        )
      )}
    </div>
  );
};

export default Favorites;
