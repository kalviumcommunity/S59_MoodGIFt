import React from "react";

export default function WhatToDo() {
  return (
    <div className="info-div">
      <h1>What you do here?</h1>
      <div className="info-container flex">
        <div className="mood-card">
          <h2>Choose Your Mood</h2>
          <p>
            Select your current mood from a variety of options, from happy to
            bored, and let us find the perfect memes for you.
          </p>
        </div>
        <div className="mood-card">
          <h2>Enjoy Memes Galore</h2>
          <p>
            Sit back, relax, and enjoy a selection of memes tailored to your
            chosen mood.
          </p>
        </div>
        <div className="mood-card">
          <h2>Need a Surprise?</h2>
          <p>
            Feeling indecisive? Opt for random recommendations and let us
            surprise you with a meme that's sure to make you smile.
          </p>
        </div>
      </div>
    </div>
  );
}
