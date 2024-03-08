import React, { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import UpdateForm from "./UpdateForm";
export default function MemeInfo({ currentMeme }) {
  const [initiateUpdate, setInitiateUpdate] = useState(false);
  const [initiateDelete, setInitiateDelete] = useState(false);
  return (
    <div className="memeInfo">
      {initiateUpdate && (
        <UpdateForm
          setInitiateUpdate={setInitiateUpdate}
          meme_id={currentMeme._id}
          category={currentMeme.mood_category}
        />
      )}

      {initiateDelete && (
        <DeleteConfirmation
          setInitiateDelete={setInitiateDelete}
          meme_id={currentMeme._id}
        />
      )}

      {!initiateUpdate && !initiateDelete && currentMeme && (
        <div className="info-meme">
          <img src={currentMeme.url} alt="" className="meme-img" />
          <p className="meme-name">{currentMeme.name}</p>
          <div className="flex">
            {" "}
            <button
              class="button update-button"
              onClick={() => {
                setInitiateUpdate(true);
              }}
            >
              Update
            </button>
            <button
              class="button delete-button"
              onClick={() => {
                setInitiateDelete(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
