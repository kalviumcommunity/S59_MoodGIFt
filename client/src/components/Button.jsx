import React from "react";

export default function Button({ category, setCategory }) {
  return (
    <button
      onClick={() => {
        setCategory(category);
      }}
      className="button"
    >
      {category}
    </button>
  );
}
