import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function DeleteConfirmation({ setInitiateDelete, currentMeme }) {
  const navigate = useNavigate();

  const deleteData = async () => {
    try {
      const meme_id = currentMeme._id;
      const mood_category = currentMeme.mood_category.toLowerCase();
      const response = await axios.delete(
        `https://frantic-smock-lion.cyclic.app/delete/${mood_category}/${meme_id}`
      );

      console.log(response.data);
      navigate(`/memes/${currentMeme.mood_category}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="delete-confirmation">
      <h1>Confirm Delete?</h1>
      <div className="flex">
        <button
          onClick={() => {
            setInitiateDelete(false);
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            deleteData();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
