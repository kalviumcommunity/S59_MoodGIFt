import React, { useState } from "react";
import MemesSection from "./pages/MemesSection";
import LandingDiv from "./pages/LandingDiv";
import Navbar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MemeForm from "./pages/MemeForm";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingDiv />} />
        <Route path="/categories" element={<MemesSection />} />
        <Route path="/post" element={<MemeForm />} />
      </Routes>
    </div>
  );
}

export default App;
