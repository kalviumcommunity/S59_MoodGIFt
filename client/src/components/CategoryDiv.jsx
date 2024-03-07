import React from "react";
import Button from "./Button";

export default function CategoryDiv({
  setCategory,
  selectionVisibility,
  setSelectionVisibility,
  handleClick,
}) {
  const style = {
    display: selectionVisibility,
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
    <div id="buttonDiv" style={style}>
      {moods.map((mood, i) => {
        return (
          <Button
            key={i}
            category={mood}
            handleClick={() => {
              handleClick(mood);
            }}
          />
        );
      })}
    </div>
  );
}
