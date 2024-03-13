import React from "react";
import { Link } from "react-router-dom";

export default function Button({ category }) {
  return (
    <Link to={`/memes/${category}`}>
      <button className="button">{category}</button>
    </Link>
  );
}
