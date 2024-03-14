import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogoutForm = ({ setIsUserLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      document.cookie =
        "user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
      setIsUserLoggedIn(false);
      console.log("User logged out successfully");
      toast.success("LogOut Successful!");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer theme="dark" autoClose={2000} />
    </>
  );
};

export default LogoutForm;
