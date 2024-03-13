import React, { useState } from "react";
import Categories from "./pages/Categories";
import LandingDiv from "./pages/LandingDiv";
import Navbar from "./components/NavBar";
import MemeInfo from "./components/MemeInfo";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MemeForm from "./pages/MemeForm";
import Memes from "./pages/Memes";
import RegisterForm from "./pages/RegistrationForm";
import LoginForm from "./pages/LoginForm";
function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  return (
    <div className="App">
      <Navbar isUserLoggedIn={isUserLoggedIn} />
      <Routes>
        <Route path="/" element={<LandingDiv />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/memes/:category" element={<Memes />} />
        <Route path="/post" element={<MemeForm />} />
        <Route path="/memeOverview" element={<MemeInfo />} />
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
