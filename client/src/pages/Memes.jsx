import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Meme from "../components/Meme";
import "./MemesSection.css";
import Loader from "../components/Loader";
import MemeInfo from "../components/MemeInfo";
export default function Memes() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMeme, setViewMeme] = useState(false);
  const [currentMeme, setCurrentMeme] = useState(null);

  const showMeme = (meme) => {
    setCurrentMeme(meme);
    setViewMeme(true);
  };

  const { category } = useParams();
  useEffect(() => {
    if (category != "") {
      let end = category.toLowerCase();
      console.log(end);

      const api = `https://frantic-smock-lion.cyclic.app/${category}`;
      fetch(api)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const refetchData = async (category) => {
    setLoading(true); 
    const api = `https://frantic-smock-lion.cyclic.app/${category}`;
    try {
      const response = await fetch(api);
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="meme-div">
      {viewMeme && (
        <>
          <div
            className="cover"
            onClick={() => {
              setViewMeme(false);
            }}
          ></div>
          <MemeInfo currentMeme={currentMeme} />
        </>
      )}
      {loading && <Loader />}
      <div id="memes">
        {data.map((meme, i) => {
          return <Meme key={i} meme={meme} showMeme={showMeme} />;
        })}
      </div>
    </div>
  );
}
