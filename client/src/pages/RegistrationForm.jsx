import React from "react";
import { useForm } from "react-hook-form";
import "./Form.css";
import { Link } from "react-router-dom";
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error registering user: ${response.statusText}`);
      }

      const { message, data: savedUser } = await response.json();
      console.log("Registration successful:", message);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>
      <div>
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          id="fullname"
          {...register("fullname", { required: true })}
        />
        {errors.fullname && (
          <span className="error">Full name is required</span>
        )}
      </div>
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
        />
        {errors.email && (
          <span className="error">
            {errors.email.type === "required"
              ? "Email is required"
              : "Invalid email format"}
          </span>
        )}
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
      <button type="submit">Register</button>
      <div>
        Already have an account?{" "}
        <Link to="/login">
          <p className="link">Login here</p>
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
