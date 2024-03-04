import React, { useEffect, useState } from "react";
import Button from "./Button";
import "./MemesSection.css";
import Meme from "./Meme";
export default function MemesSection() {
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);

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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [category]);

  return (
    <div id="memeSection">
      <div id="buttons">
        <Button category={"Happy"} setCategory={setCategory} />
        <Button category={"Bored"} setCategory={setCategory} />
        <Button category={"Excited"} setCategory={setCategory} />
        <Button category={"Angry"} setCategory={setCategory} />
        <Button category={"Sad"} setCategory={setCategory} />
        <Button category={"Stressed"} setCategory={setCategory} />
      </div>
      <div id="memes">
        {data.map((meme, i) => {
          return <Meme key={i} meme={meme} />;
        })}
      </div>
    </div>
  );
}
