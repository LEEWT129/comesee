import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import ToastStyle from "../../css/home/like.module.css";
import BtnLike from "./btnLike";
import axios from "axios";
// import TicketContext from "../../TicketContext";
import jwtDecode from "jwt-decode";
import LikePlayList from "./LikePlayList";
import Swal from "sweetalert2";
// import { Link } from "react-router-dom";

function Like(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [playlist, setPlayList] = useState([]);

  // const context = useContext(TicketContext);
  // const userID = context.state.userID;
  const movieID = props.movieID;

  let token = localStorage.getItem("token") || null;
  const userID = token ? jwtDecode(token).userId : null;

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

  //以userID與movieID判斷該使用者是否有收藏此電影
  useEffect(() => {
    axios
      .get(`http://localhost:2407/playlist/like/${userID}/${movieID}`)
      .then((response) => {
        // console.log(response.data.result);
        //如果片單有該電影
        if (response.data.result) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [movieID, userID]);

  //取得該使用者擁有的所有片單放入playlist
  useEffect(() => {
    axios
      .get(`http://localhost:2407/playlist/${userID}`)
      .then((response) => {
        // console.log(response.data);
        setPlayList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userID]);

  //點擊收藏鍵
  const handleClickHeart = () => {
    if (isLiked === false) {
      setShowModal(true);
    } else {
      axios
        .delete("http://localhost:2407/playlist/movie", {
          data: {
            MovieID: movieID,
            userID: userID,
          },
        })
        .then((response) => {
          if (response.data.result) {
            Toast.fire({
              icon: "info",
              title: "已將電影從片單中移除",
              html: `
            <div>
              <a href="/Collectionpage">查看我的收藏片單</a>
            </div>
          `,
            });

            setIsLiked(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  //關閉modal
  const closeModal = () => {
    setShowModal(false);
    // setIsLiked(false);
  };

  return (
    <>
      <div className={ToastStyle.btnContainer} onClick={handleClickHeart}>
        <button type="button" className={ToastStyle.btnstyle} id="liveToastBtn">
          <BtnLike className={ToastStyle.btnlike} isLiked={isLiked} />
        </button>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div
            className="modal-dialog modal-md modal-dialog-scrollable modal-dialog-centered"
            role="document"
          >
            <div className="modal-content" style={{ background: "#F1EFE9" }}>
              <div className="modal-header border-0">
                <h5
                  className="modal-title fs-4 fw-bold"
                  style={{ color: '#2f2f2f' }}
                >
                  請選擇要放入哪個片單
                </h5>
                <button
                  type="button"
                  className="btn-close "
                  onClick={closeModal}
                >
                  {/* <span>&times;</span> */}
                </button>
              </div>
              <div className="modal-body container " style={{ color: "black" }}>
                <div className="row g-3">
                  {playlist.map((playlist, index) => (
                    <LikePlayList
                      key={index}
                      playlistID={playlist.playlistID}
                      listname={playlist.listname}
                      userID={userID}
                      closeModal={closeModal}
                      movieID={movieID}
                      setIsLiked={setIsLiked}
                    />
                  ))}
                </div>
              </div>
              {/* <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  关闭
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Like;
