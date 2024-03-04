import React, { useState } from "react";
import MemesSection from "./components/MemesSection";
import LandingDiv from "./LandingDiv";
import './App.css'
function App() {
  return (
    <div className="App">
      <LandingDiv />
      <MemesSection />
    </div>
  );
}

export default App;
