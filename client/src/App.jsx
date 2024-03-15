import React, { useEffect, useState } from "react";
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
import UserProfile from "./pages/UserInfo";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const tokenCookie = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    console.log(tokenCookie);
    if (tokenCookie) {
      setIsUserLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingDiv />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/memes/:category" element={<Memes />} />
        <Route path="/post" element={<MemeForm isUserLoggedIn={isUserLoggedIn}/>} />
        <Route path="/memeOverview" element={<MemeInfo />} />
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route
          path="/login"
          element={<LoginForm setIsUserLoggedIn={setIsUserLoggedIn} />}
        ></Route>
        <Route 
          path="/profile"
          element={
            <UserProfile
              setIsUserLoggedIn={setIsUserLoggedIn}
              isUserLoggedIn={isUserLoggedIn}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
