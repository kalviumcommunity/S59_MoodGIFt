import React, { useEffect, useState } from "react";
import "./MemesSection.css";
import Meme from "../components/Meme";
import CategoryDiv from "../components/CategoryDiv";
import { useNavigate } from "react-router-dom";

export default function MemesSection({ currentMeme, setCurrentMeme }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [selectionVisibility, setSelectionVisibility] = useState("none");

  useEffect(() => {
    if (category != "") {
      let end = category.toLowerCase();
      console.log(end);

      const api = `https://frantic-smock-lion.cyclic.app/${end}`;
      fetch(api)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
          setTimeout(() => {
            var target = document.getElementById("memes");
            target.scrollIntoView({ top: 0, behavior: "smooth" });
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [category, currentMeme]);

  const handleClick = (mood) => {
    setCategory(mood);
    setSelectionVisibility("none");
  };

  const showMeme = (meme) => {
    setCurrentMeme(meme);
    navigate("/memeOverview");
  };

  return (
    <div id="memeSection">
      <div id="buttons">
        <button
          id="selectButton"
          className="button"
          onClick={() => {
            if (selectionVisibility === "flex") setSelectionVisibility("none");
            else setSelectionVisibility("flex");
          }}
        >
          Select Category
        </button>
        <CategoryDiv
          setCategory={setCategory}
          selectionVisibility={selectionVisibility}
          setSelectionVisibility={setSelectionVisibility}
          handleClick={handleClick}
        />
      </div>

      <div id="memes">
        {data.map((meme, i) => {
          return <Meme key={i} meme={meme} showMeme={showMeme} />;
        })}
      </div>
    </div>
  );
}
