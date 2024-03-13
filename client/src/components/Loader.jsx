import React from "react";
import "./Loader.css";

export default function Loader() {
  const dots = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="loader-container">
      <div className="loader">
        {dots.map((dot) => (
          <span key={dot} style={{ "--i": dot }}></span>
        ))}
      </div>
    </div>
  );
}
