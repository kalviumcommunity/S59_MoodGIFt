import React, { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import UpdateForm from "./UpdateForm";
import "./MemeInfo.css";
export default function MemeInfo({ currentMeme }) {
  const [initiateUpdate, setInitiateUpdate] = useState(false);
  const [initiateDelete, setInitiateDelete] = useState(false);
  return (
    <div className="memeInfo">
      {initiateUpdate && (
        <UpdateForm
          setInitiateUpdate={setInitiateUpdate}
          currentMeme={currentMeme}
        />
      )}

      {initiateDelete && (
        <DeleteConfirmation
          setInitiateDelete={setInitiateDelete}
          currentMeme={currentMeme}
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
