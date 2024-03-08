import React from "react";

export default function Meme({ meme }) {
  return (
    <div className="meme">
      <img src={meme.url} alt="" className="meme-img" />
      <p className="meme-name">{meme.name}</p>
    </div>
  );
}
