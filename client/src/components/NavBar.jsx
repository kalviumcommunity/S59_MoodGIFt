import React from "react";
import "./NavBar.css";
function Navbar({ user, setUser }) {
  return (
    <nav>
      <h2>MoodGIFT</h2>
      <ul className="nav-list">
        <li>Home</li>
        <li>Memes</li>
        <li>Categories</li>
        <li>About</li>
        <li>Profile</li>
      </ul>
    </nav>
  );
}

export default Navbar;
