import React, { useEffect, useState } from "react";
import PlayList from "./PlayList";
import MovieListModal from "./MovieListModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import axios from "axios";

const PlayListArea = (props) => {
  const { userID } = props; //從Tab.js獲取的userID
  const [playlist, setPlaylist] = useState([]); //資料庫抓取的playlist所有片單ID與片單名稱 存放處

  const [onClickPlayListID, setOnClickPlayListID] = useState(null);
  const [playListName, setPlayListName] = useState(null);

  //modal
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    //獲取該使用者的所有片單ID與片單名稱=>playlist/{要去抓點擊頭像的userID}
    //                               =>會員頁面的:playlist/{要去抓當下登入的userID}
    axios
      .get(`http://localhost:2407/playlist/${userID}`)
      .then((response) => {
        setPlaylist(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userID,playlist]);
  // console.log(playlist);
  return (
    <div className="d-flex flex-wrap">
      {playlist.map((playlist, index) => {
        return (
          //送入playlistID和listname
          //handleOpenModal送入playList 讓其獲得點擊可以把MovieListModal打開的函式
          //setOnClickPlayListID送入playList 讓其獲得點擊時可以把點擊到的片單的PlayListID設置給OnClickPlayListID的函式
          <PlayList
            key={index}
            playlistID={playlist.playlistID}
            listname={playlist.listname}
            handleOpenModal={handleOpenModal}
            setOnClickPlayListID={setOnClickPlayListID}
            setPlayListName={setPlayListName}
          />
        );
      })}

      <MovieListModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        onClickPlayListID={onClickPlayListID}
        playListName={playListName}
      />
    </div>
  );
};

export default PlayListArea;