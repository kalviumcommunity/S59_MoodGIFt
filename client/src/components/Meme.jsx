import React from "react";

export default function Meme({meme}) {
  return (
    <div class="meme">
      <img src={meme.url} alt="" class="meme-img" />
      <p class="meme-name">{meme.name}</p>
    </div>
  );
}
