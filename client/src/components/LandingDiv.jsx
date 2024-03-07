import React from "react";
import "./LandingDiv.css";
import MemeGIF from "../assets/meme.gif";
import WhatToDo from "./WhatToDo";
import { Link } from "react-router-dom";
export default function LandingDiv() {
  const handleClick = () => {
    var target = document.getElementById("selectButton");
    target.scrollIntoView({ top: 100, behavior: "smooth" });
  };

  return (
    <>
      <div className="landing-div flex space-around align-center">
        <div className="landing-texts flex column">
          <h1>Welcome to MoodGIFt: Your Mood-Boosting Meme Companion!</h1>
          <div>
            <h3>
              Feeling down? Stressed? Or maybe just looking for a good laugh?
              MoodGIFt has you covered!
            </h3>
            <Link to={'/categories'}>
              <button className="button">Get Started</button>
            </Link>
          </div>
        </div>
        <div className="meme-gif-div">
          <img src={MemeGIF} alt="" id="meme-gif" />
        </div>
      </div>
      {/* <WhatToDo/> */}
    </>
  );
}
