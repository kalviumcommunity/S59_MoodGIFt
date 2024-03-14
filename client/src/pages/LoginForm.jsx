import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Form.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = ({ setIsUserLoggedIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function getExpirationDate(days) {
    const now = new Date();
    now.setDate(now.getDate() + days);
    return now.toUTCString();
  }

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { token } = await response.json();

        toast.success('Login Successful');
        document.cookie = `token=${token}; expires=${getExpirationDate(1)}`;
        setIsUserLoggedIn(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", { required: true })}
        />
        {errors.username && <span className="error">Username is required</span>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span className="error">Password is required</span>}
      </div>
      <button type="submit">Login</button>
      <p>
        Don't have an account?{" "}
        <Link to="/register">
          {" "}
          <span className="link">Register here</span>
        </Link>
      </p>
      <ToastContainer theme="dark" autoClose={2000} />
    </form>
  );
};

export default LoginForm;
