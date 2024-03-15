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

  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("All");
  const [list, setList] = useState(null);

  const showMeme = (meme) => {
    setCurrentMeme(meme);
    setViewMeme(true);
  };

  const { category } = useParams();
  useEffect(() => {
    if (category != "") {
      let end = category.toLowerCase();
      console.log(end);

      const api = `https://frantic-smock-lion.cyclic.app/meme/${category}`;
      fetch(api)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
          setList(data);
          const uniqueUsers = [...new Set(data.map((user) => user.posted_by))];
          setUniqueUsers(uniqueUsers);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    const filteredList = data.filter((meme) => {
      if (selectedUser === "All") return true;
      return meme.posted_by === selectedUser;
    });
    setList(filteredList);
  }, [selectedUser]);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
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
      {list && (
        <>
          <div className="sortSelect">
            <p>Sort by users:</p>
            <select value={selectedUser} onChange={handleUserChange}>
              <option value="All">All</option>
              {uniqueUsers.map((user, i) => (
                <option key={i} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div id="memes">
            {list.map((meme, i) => {
              return <Meme key={i} meme={meme} showMeme={showMeme} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

// const refetchData = async (category) => {
//   setLoading(true);
//   const api = `https://frantic-smock-lion.cyclic.app/${category}`;
//   try {
//     const response = await fetch(api);
//     const data = await response.json();
//     setData(data);
//   } catch (err) {
//     console.log(err);
//   } finally {
//     setLoading(false);
//   }
// };
