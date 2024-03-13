import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [navBarVisibility, setNavBarVisibility] = useState("hidden");
  const handleClick = () => {
    navBarVisibility === "hidden"
      ? setNavBarVisibility("visible")
      : setNavBarVisibility("hidden");
  };

  return (
    <>
      <div
        id="cover"
        className={`cover ${navBarVisibility}`}
        onClick={handleClick}
      ></div>

      <nav className="flex space-between align-center">
        <Link to="/">
          <h2>MoodGIFT</h2>
        </Link>

        <div className="menu-icon" id="menuIcon" onClick={handleClick}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <ul className="nav-list align-center space-between">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/categories">
            <li>Categories</li>
          </Link>
          <Link to="/post">
            <li>Post Meme</li>
          </Link>

          <Link to="/profile">
            <li>Profile</li>
          </Link>
        </ul>

        <ul
          className={`nav-bar-for-mobile space-around align-center ${navBarVisibility}`}
        >
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/categories">
            <li>Categories</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/register">
            <li>Profile</li>
          </Link>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
