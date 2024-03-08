import React from "react";

export default function Meme({ meme, showMeme, }) {
  return (
    <div
      className="meme"
      onClick={() => {
        showMeme(meme);
      }}
    >
      <img src={meme.url} alt="" className="meme-img" />
      <p className="meme-name">{meme.name}</p>
    </div>
  );
}
