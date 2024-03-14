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
        const tokenCookie = document.cookie
          .split(";")
          .find((cookie) => cookie.trim().startsWith("token="));
        const token = tokenCookie?.split("=")[1];

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`http://localhost:8080/user/profile`, {
          headers: {
            Authorization: token,
          },
        });
        if (response.status === 401) {
          navigate("/login");
          return;
        }

        const data = await response.json();
        console.log(data);
        setUserData(data.user);
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
            <li>Full Name: {userData.fullname}</li>
            <li>Username: {userData.username}</li>
            <li>Email: {userData.email}</li>
          </ul>
          <LogoutForm setIsUserLoggedIn={setIsUserLoggedIn} />
        </div>
      )}
    </>
  );
};

export default UserProfile;
