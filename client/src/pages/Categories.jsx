import React from "react";
import "./Category.css";
import categories from "./CategoriesData";
import { Link } from "react-router-dom";

function Category({ mood }) {
  return (
    <Link to={`/memes/${mood.mood}`}>
      <div className="category">
        <div className="square-container">
          <img src={mood.image} alt="" className="category-img" />
        </div>
        <p className="category-name">{mood.mood}</p>
      </div>
    </Link>
  );
}
export default function Categories() {
  console.log(categories);
  return (
    <>
    <h1 className="category-heading">Select the Category</h1>
      <div id="categoriesSection">
        {categories &&
          categories.map((mood, i) => {
            return <Category key={i} mood={mood} />;
          })}
      </div>
    </>
  );
}
