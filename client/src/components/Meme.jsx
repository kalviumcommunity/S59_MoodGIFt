import React from "react";

export default function Meme({ meme, showMeme }) {
  return (
    <div
      className="meme"
      onClick={() => {
        showMeme(meme);
      }}
    >
      <p className="posted-by">
        <span className="posted">Posted By:</span> {meme.posted_by}
      </p>
      <img src={meme.url} alt="" className="meme-img" />
      <p className="meme-name">{meme.name}</p>
    </div>
  );
}
