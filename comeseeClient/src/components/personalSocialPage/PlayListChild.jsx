import React, { useState, useEffect } from "react";
import liststyle from "../../css/personalSocialPage/PlayListChild.module.css";
import axios from "axios";

const PlayListChild = (props) => {
  const playlistID = props.playlistID;
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    //依照傳入的playlistID獲得該playlist全部收藏的電影資訊(ID、movieNameCN、imageUrl)
    axios
      .get(`http://localhost:2407/playlist/movieinplaylist/${playlistID}`)
      .then((response) => {
        // console.log(response.data);
        setMovie(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [playlistID]);

  // 確保必定有4個資料可以map
  while (movie.length < 4) {
    movie.push({ imageUrl: "default_image_url" }); // 預設圖片 URL
  }

  return (
    <div className={liststyle.movieList}>
      {movie.slice(0, 4).map((movie, index) => (
        <div
          key={index}
          className={liststyle.movie}
          // style={{ zIndex: movie.length - index }}
        >
          <img
            src={movie.imageUrl}
            className={`img-fluid h-100 ${liststyle.movieImg}`}
            alt={""}
          />
        </div>
      ))}
    </div>
  );
};

export default PlayListChild;