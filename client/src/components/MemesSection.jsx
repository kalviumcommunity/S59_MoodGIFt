import React, { useEffect, useState } from "react";
import Button from "./Button";
import "./MemesSection.css";
import Meme from "./Meme";
import ButtonDiv from "./ButtonDiv";
export default function MemesSection() {
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
  }, [category]);

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
        <ButtonDiv
          setCategory={setCategory}
          selectionVisibility={selectionVisibility}
          setSelectionVisibility={setSelectionVisibility}
        />
      </div>
      <div id="memes">
        {data.map((meme, i) => {
          return <Meme key={i} meme={meme} />;
        })}
      </div>
    </div>
  );
}
