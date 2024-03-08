import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Form.css";
import axios from "axios";
const UpdateForm = ({ meme_id, setInitiateUpdate, category }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(meme_id);
      const mood_category = category.toLowerCase();
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== "")
      );

      console.log(filteredData)
      const response = await axios.patch(
        `https://frantic-smock-lion.cyclic.app/postMeme/${mood_category}/${meme_id}`,
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
      <h1>Update Meme</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input type="text" {...register("name")} />
          {errors.name && <p className="error">This field is required</p>}
        </div>

        <div className="field">
          <label htmlFor="url">URL</label>
          <input type="text" {...register("url")} />
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
