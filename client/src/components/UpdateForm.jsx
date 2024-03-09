import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Form.css";
import axios from "axios";

const UpdateForm = ({ currentMeme, setInitiateUpdate }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: currentMeme.name,
      url: currentMeme.url,
    },
  });

  const onSubmit = async (data) => {
    try {
      const meme_id = currentMeme._id;
      const mood_category = currentMeme.mood_category.toLowerCase();
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== "")
      );

      console.log(filteredData);
      const response = await axios.patch(
        `https://frantic-smock-lion.cyclic.app/patch/${mood_category}/${meme_id}`,
        filteredData
      );

      console.log(response.data);
      navigate("/categories");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Update {currentMeme.name}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="name">Updated Name:</label>
          <input type="text" {...register("name", { required: true })} />
          {errors.name && <p className="error">This field is required</p>}
        </div>

        <div className="field">
          <label htmlFor="url">Updated URL:</label>
          <input type="text" {...register("url", { required: true })} />
          {errors.url && <p className="error">This field is required</p>}
        </div>

        <div className="flex">
          <button
            onClick={() => {
              setInitiateUpdate(false);
            }}
          >
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
