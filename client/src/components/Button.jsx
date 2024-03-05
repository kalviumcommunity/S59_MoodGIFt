import React from "react";

export default function Button({ category, handleClick }) {
  return (
    <button
      onClick={() => {
        handleClick(category);
      }}
      className="button"
    >
      {category}
    </button>
  );
}
