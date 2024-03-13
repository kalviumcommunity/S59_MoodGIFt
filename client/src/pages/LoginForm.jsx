import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./Form.css";
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error logging in: ${response.statusText}`);
      }

      const { message } = await response.json();
      console.log("Login successful:", message);
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
          <p className="link">Register here</p>
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
