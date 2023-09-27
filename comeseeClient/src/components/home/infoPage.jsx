import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

import Rank from "../booking/Rank";
import Score from "./score";
import Like from "./like";

import TimeTabs from "./timeTabs";
import StoryTabs from "./storyTabs";
import CommentTabs from "./commentTabs";

import IS from "../../css/home/infoPage.module.css";

const InfoPage = (props) => {
  const [filmInfo, setFilmInfo] = useState([]);
  const [averageScore, setAverageScore] = useState(0); // 初始化平均分數狀態

  const id = parseInt(props.match.params.id);
  console.log(id);

  const history = useHistory();
  const location = useLocation();

  const [tabState, setTabState] = useState(
    new URLSearchParams(props.location.search).get("tab") || "time"
  );

  useEffect(() => {
    const tabFromURL = new URLSearchParams(location.search).get("tab");
    if (tabFromURL) {
      setTabState(tabFromURL);
    }
  }, [location.search]);

  // 指定電影資訊
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`http://localhost:2407/filminfo/${id}`)
      .then((res) => {
        setFilmInfo(res.data[0]);
      })
      .catch((err) => {
        console.log(err.response);
      });
    axios
      .get(`http://localhost:2407/filminfo/averageScore/${id}`)
      .then((res) => {
        setAverageScore(res.data.averageScore.toFixed(1));
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [id]);

  // 轉成localTime，傳入utc字串
  const targetLocalDate = (utcStr) => {
    if (utcStr === undefined) {
      return;
    }
    // console.log(utcStr);
    // 將 UTC 字串轉換成 JavaScript 的 Date 物件
    let utcDate = new Date(utcStr);
    // 指定目標時區的偏移量（以分鐘為單位）
    let targetTimezoneOffset = 480; // 假設目標時區是 UTC+08:00
    // 計算目標時區的本地時間
    let targetLocal = new Date(
      utcDate.getTime() + targetTimezoneOffset * 60000
    );
    let date = targetLocal.toISOString().split("T")[0]; // 格式為 2023-08-23
    return date;
  };

  const handleTimeTabChange = () => {
    history.push(`/info/${id}?tab=time`);
  };

  const handleStoryTabChange = () => {
    history.push(`/info/${id}?tab=story`);
  };

  const handleCommentTabChange = () => {
    history.push(`/info/${id}?tab=comment`);
  };

  return (
    <div className={IS.Info}>
      <div className={` ${IS.box} container`}>
        {/* 電影資訊上半部 */}
        <div className="info-top row">
          <div className="col-3">
            <img className={IS.poster} src={filmInfo.imageUrl} alt="poster" />
          </div>

          <div className="col-6 px-4 py-3">
            <h1 className={IS.title}>{filmInfo.movieNameCN}<Rank rank={filmInfo.rank} /></h1>

            <h2 className={IS.subtitle}>{filmInfo.movieNameEN}</h2>
            <div className={IS.info}>
              <p>上映日期：{targetLocalDate(filmInfo.releaseDate)}</p>
              <p>片長：{filmInfo.movieLength}</p>
              <p>類型：{filmInfo.movieType}</p>
              <p>導演：{filmInfo.director}</p>
              <p>演員：{filmInfo.actor}</p>
            </div>
          </div>

          <div className={`${IS.scoreBox} col-3 px-5 py-3`}>
            {/* 收藏按鈕 */}
            <Like movieID={id} />
            <Score id={filmInfo.id} averageScore={averageScore} />
          </div>
        </div>

        {/* 電影資訊內容 */}
        <div class="info-body">
          {/* 分頁標籤 */}
          <nav className={IS.myNav}>
            <div className={IS.myTabs} id="nav-tab" role="tablist">
              <button
                className={`${IS.myLink} infoTab ${tabState === "time" ? "active" : ""
                  }`}
                id="time-tab"
                data-bs-toggle="tab"
                data-bs-target="#time"
                type="button"
                role="tab"
                aria-controls="time"
                aria-selected={tabState === "time"}
                onClick={handleTimeTabChange}
              >
                電影時刻
              </button>

              <button
                className={`${IS.myLink} infoTab ${tabState === "story" ? "active" : ""
                  }`}
                id="story-tab"
                data-bs-toggle="tab"
                data-bs-target="#story"
                type="button"
                role="tab"
                aria-controls="story"
                aria-selected={tabState === "story"}
                onClick={handleStoryTabChange}
              >
                劇情介紹
              </button>

              <button
                className={`${IS.myLink} infoTab ${tabState === "comment" ? "active" : ""
                  }`}
                id="comment-tab"
                data-bs-toggle="tab"
                data-bs-target="#comment"
                type="button"
                role="tab"
                aria-controls="comment"
                aria-selected={tabState === "comment"}
                onClick={handleCommentTabChange}
              >
                評論
              </button>
            </div>
          </nav>

          {/* 分頁內容 */}
          <div className={`${IS.myContent} tab-content`} id="nav-tabContent">
            <div
              className={`tab-pane fade ${tabState === "time" ? "show active" : ""
                }`}
              id="time"
              role="tabpanel"
              aria-labelledby="time-tab"
            >
              <TimeTabs id={filmInfo.id} />
            </div>

            <div
              className={`tab-pane fade ${tabState === "story" ? "show active" : ""
                }`}
              id="story"
              role="tabpanel"
              aria-labelledby="story-tab"
            >
              <StoryTabs id={id} story={filmInfo.story} />
            </div>

            <div
              className={`tab-pane fade ${tabState === "comment" ? "show active" : ""
                }`}
              id="comment"
              role="tabpanel"
              aria-labelledby="comment-tab"
            >
              <CommentTabs
                // id={filmInfo.id}
                filmInfo={filmInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
