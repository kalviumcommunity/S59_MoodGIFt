import React from "react";
import "./LandingDiv.css";
import Navbar from "./components/NavBar";
export default function LandingDiv() {
  return (
    <div>
      <div className="landing-div">
        <div id="cover"></div>
        <Navbar />
        <div className="landing-texts">
          <h1>Welcome to MoodGIFt: Your Mood-Boosting Meme Companion!</h1>
          <div>
            <h2>Discover Memes That Match Your Mood</h2>
            <h3>
              Feeling down? Stressed? Or maybe just looking for a good laugh?
              MoodGIFt has you covered! Our curated collection of memes is
              designed to lift your spirits, one meme at a time.
            </h3>
          </div>
          <button className="button">Get Started</button>
        </div>
      </div>
      
    </div>
  );
}
