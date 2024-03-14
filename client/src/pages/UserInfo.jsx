import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutForm from "../components/Logout";
import "./UserProfile.css";

const UserProfile = ({ setIsUserLoggedIn, isUserLoggedIn }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    } else {
      const fetchUserData = async () => {
        try {
          const userCookie = document.cookie
            .split(";")
            .find((cookie) => cookie.trim().startsWith("user="));
          const user = userCookie?.split("=")[1];
          console.log(user);
          const response = await fetch(
            `http://localhost:8080/user/profile/${user}`
          );
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  return (
    <>
      {userData && (
        <div className="user-profile">
          <h2>User Profile</h2>
          <ul>
            <li>Full Name: {userData.user.fullname}</li>
            <li>Username: {userData.user.username}</li>
            <li>Email: {userData.user.email}</li>
          </ul>
          <LogoutForm setIsUserLoggedIn={setIsUserLoggedIn} />
        </div>
      )}
    </>
  );
};

export default UserProfile;
