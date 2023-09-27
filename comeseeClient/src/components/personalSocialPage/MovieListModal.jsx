import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function MovieListModal(props) {
  const history = useHistory();

  const { showModal, handleCloseModal, onClickPlayListID, playListName } =
    props; //onClickPlayListID為目前點擊到的片單的PlayListID

  const [movieList, setMovieList] = useState([]);

  //關閉modal
  const closeModal = () => {
    handleCloseModal(false);
  };

  useEffect(() => {
    if (onClickPlayListID !== null && onClickPlayListID !== undefined) {
      //在movieinplaylist資料表中取得該playlistID擁有的電影ID與中文名與imageUrl
      axios
        .get(
          `http://localhost:2407/playlist/movieinplaylist/${onClickPlayListID}`
        )
        .then((response) => {
          setMovieList(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [onClickPlayListID]);

  return (
    <div>
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div
            className="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered"
            role="document"
          >
            <div className="modal-content" style={{ background: "#F1EFE9" }}>
              <div className="modal-header border-0">
                <h5 className="modal-title fs-4 fw-bold">{playListName}</h5>
                <button
                  type="button"
                  className="btn-close "
                  onClick={closeModal}
                >
                  {/* <span>&times;</span> */}
                </button>
              </div>
              <div className="modal-body container ">
                <div className="row g-3">
                  {movieList.map((movie, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        history.push(`/info/${movie.ID}`); //跳至相對的電影info頁面
                      }}
                      className={"col-4"}
                      style={{ width: "190px", cursor: "pointer" }}
                    >
                      <img
                        src={movie.imageUrl}
                        className={`img-fluid w-100`}
                        alt={""}
                      />
                    </div>
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
    </div>
  );
}

export default MovieListModal;