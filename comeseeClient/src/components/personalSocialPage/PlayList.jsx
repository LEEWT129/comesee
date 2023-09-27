import React, { useState, useEffect } from "react";
import PlayListChild from "./PlayListChild";
import PLstyles from "../../css/personalSocialPage/PlayList.module.css";

import axios from "axios";

function PlayList(props) {
  const {
    playlistID,
    listname,
    handleOpenModal,
    setOnClickPlayListID,
    setPlayListName,
  } = props;
  const [movieCount, setMovieCount] = useState(0);

  const playlistStyle = {
    cursor: "pointer",
  };

  useEffect(() => {
    //依照傳入的playlistID獲得該playlist共收藏了幾部電影(movieCount)
    axios
      .get(`http://localhost:2407/playlist/movieCount/${playlistID}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setMovieCount(response.data[0].movieCount);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [playlistID]);

  return (
    <div
      className={PLstyles.playListOutside}
      onClick={() => {
        setOnClickPlayListID(playlistID);
        setPlayListName(listname);
        handleOpenModal();
      }}
      style={playlistStyle}
    >
      <PlayListChild playlistID={playlistID} />
      {/* 片單名稱+收藏數量 */}
      <div>
        {/* 片單名稱 */}
        <p className={PLstyles.p}>{listname}</p>
        {/* 收藏數量 */}
        <div className={PLstyles.span}>
          <span>{movieCount}</span>
          <span>部電影</span>
        </div>
      </div>
    </div>
  );
}

export default PlayList;