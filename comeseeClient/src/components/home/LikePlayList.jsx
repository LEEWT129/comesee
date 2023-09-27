import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

import LPL from "../../css/home/likePlayList.module.css";

function LikePlayList(props) {
  const { playlistID, listname, closeModal, movieID, setIsLiked } = props;

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  //   useEffect(() => {

  //   }, []);
  const addMovieIntoPlayList = () => {
    axios
      .post(`http://localhost:2407/playlist/movie`, {
        playlistID: playlistID,
        MovieID: movieID,
      })
      .then((response) => {
        // console.log(response.data);
        //新增收藏成功
        if (response.data.result) {
          Toast.fire({
            icon: "success",
            title: "收藏電影成功",
            html: `
            <div>
              <a href="/Collectionpage">查看我的收藏片單</a>
            </div>
          `,
          });
        }

        setIsLiked(true);
        closeModal();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className={LPL.listAndBtn}>
      <span className={LPL.listname}>{listname}</span>
      <button onClick={addMovieIntoPlayList} className={LPL.addBtn}>
        加入
      </button>
    </div>
  );
}

export default LikePlayList;
