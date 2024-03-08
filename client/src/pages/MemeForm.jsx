import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Form.css";
import axios from "axios";
const MemeForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `https://frantic-smock-lion.cyclic.app/postMeme/${data.mood_category}`,
        data
      );
      console.log(response.data);
      navigate("/categories");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const moods = [
    "Happy",
    "Sad",
    "Stressed",
    "Bored",
    "Excited",
    "Angry",
    "Confused",
    "Surprised",
    "Silly",
    "Smart",
    "Loved",
    "Chaotic",
    "Anxious",
    "Calm",
    "Smug",
  ];
  return (
    <div className="container">
      <h1>Add a New Meme</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input type="text" {...register("name", { required: true })} />
          {errors.name && <p className="error">This field is required</p>}
        </div>

        <div className="field">
          <label htmlFor="url">URL</label>
          <input type="text" {...register("url", { required: true })} />
          {errors.url && <p className="error">This field is required</p>}
        </div>

        <div className="field">
          <label htmlFor="mood_category">Mood Category</label>
          <select {...register("mood_category", { required: true })}>
            <option value="">Select Mood Category</option>
            {moods.map((mood, index) => (
              <option key={index} value={mood}>
                {mood}
              </option>
            ))}
          </select>
          {errors.mood_category && (
            <p className="error">Please select a mood category</p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MemeForm;
