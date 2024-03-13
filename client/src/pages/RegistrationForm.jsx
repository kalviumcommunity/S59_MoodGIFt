import React from "react";
import { useForm } from "react-hook-form";
import "./Form.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { message } = await response.json();

        console.log("Registration successful:", message);

        toast.success("Registration Successsful!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error);
      }
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
      <ToastContainer theme="dark" autoClose={2000} />
    </form>
  );
};

export default RegisterForm;
