import React, { useState, useEffect } from "react";
import SocialStyle from "../../css/personalSocialPage/social.module.css";
// import BtnLarge from "../socialpage/btnLarge";
import Tabb from "../../css/personalSocialPage/Tab.module.css";
import StaticStart from "./StaticStart";
import SmartMasonry from "react-smart-masonry"; // 引入 react-smart-masonry

import PlayListArea from "./PlayListArea";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css"; //  AOS 的 CSS

function Tabs(props) {
  const [toggleState, setToggleState] = useState(1); // tab的紀錄值
  const [commentsData, setCommentsData] = useState([]);

  const { userID } = props; //取得social.js傳來的prop

  useEffect(() => {
    AOS.init();
  }, []);

  ////以userID取得該user的評論資訊(movieNameCN, userName, sendTime, score, comment)
  useEffect(() => {
    axios
      .get(`http://localhost:2407/commentlist/${userID}`)
      .then((response) => {
        if (response.status !== 404) {
          // console.log(response.data);
          setCommentsData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // console.log(commentsData);
  }, [userID]);

  // 更改tab的紀錄值
  const toggleTab = (index) => {
    setToggleState(index);
  };

  //轉成localTime，傳入utc字串
  const targetLocalDate = (utcStr) => {
    if (utcStr === undefined) {
      return;
    }
    // console.log(utcStr);

    // 將 UTC 字串轉換成 JavaScript 的 Date 物件
    let utcDate = new Date(utcStr);
    // console.log(utcDate);

    // 指定目標時區的偏移量（以分鐘為單位）
    let targetTimezoneOffset = 480; // 假設目標時區是 UTC+08:00

    // 計算目標時區的本地時間
    let targetLocal = new Date(
      utcDate.getTime() + targetTimezoneOffset * 60000
    );

    let date = targetLocal.toISOString().split("T")[0]; //格式為2023-08-23

    return date;
  };

  // const commentsData = [
  //   {
  //     movieNameCN: "奧本海默",
  //     pictureName: "photo.jpg",
  //     userName: "tracy",
  //     sendTime: "2023-5-28",
  //     score: 5,
  //     text: "Lorem ipsum dolor sit amet.",
  //   },
  //   {
  //     movieNameCN: "蜘蛛人",
  //     pictureName: "photo.jpg",
  //     userName: "tracy",
  //     sendTime: "2023-5-28",
  //     score: 4,
  //     text: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
  //   },
  // ];

  const breakpoints = {
    mobile: 0, // 手機寬度
    tablet: 990, // 平板屏幕宽度
    desktop: 1400, // 桌面屏幕宽度
  };

  return (
    <div className={Tabb.main}>
      {/* tab欄 */}
      <div className={SocialStyle.tabsselector}>
        <button
          className={toggleState === 1 ? Tabb.activetabs : Tabb.tabs}
          onClick={() => toggleTab(1)}
        >
          評論
        </button>
        <button
          className={toggleState === 2 ? Tabb.activetabs : Tabb.tabs}
          onClick={() => toggleTab(2)}
        >
          片單
        </button>
      </div>
      <div className={SocialStyle.contenttabs}>
        {/* 評論 */}
        <div className={toggleState === 1 ? Tabb.activecontent : Tabb.content}>
          <SmartMasonry
            breakpoints={breakpoints}
            columns={{ mobile: 1, tablet: 2, desktop: 3 }}
            gap={{ mobile: 20, tablet: 20, desktop: 20 }}
            autoArrange={true} // 啟用自動排列
          >
            {commentsData.length !== 0 ? (
              commentsData.map((comment, index) => (
                <div
                  key={index}
                  className={SocialStyle.content1}
                  data-aos="zoom-in-right"
                >
                  <div className="d-flex justify-content-between">
                    {/* 攝影機小圖 + 電影名稱 + 星星*/}
                    <div className={Tabb.nameAndScore}>
                      <div>
                        {/* 攝影機小圖 */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="46"
                          height="23"
                          viewBox="0 0 46 23"
                          fill="none"
                        >
                          <rect
                            x="1"
                            y="1"
                            width="33"
                            height="21"
                            rx="3"
                            stroke="#F1EFE9"
                            strokeWidth="2"
                          />
                          <path
                            d="M34 16.0312L45 19V4L34 7.4375"
                            stroke="#F1EFE9"
                            strokeWidth="2"
                          />
                        </svg>
                        {/* 影片名稱 */}
                        <span className={SocialStyle.moviename}>
                          {comment.movieNameCN}
                        </span>
                      </div>
                      {/* 星星 */}
                      <StaticStart rating={comment.score} />
                      {/* 評價日期 */}
                      <p className={SocialStyle.date}>
                        {"於 " + targetLocalDate(comment.sendTime) + " 評論"}
                      </p>
                    </div>

                    {/* 電影圖 */}
                    <div className={Tabb.movieImg}>
                      <img
                        className="img-fluid rounded h-100"
                        src={comment.imageUrl}
                        alt="moviePhoto"
                      />
                    </div>
                  </div>
                  {/* 評論 */}
                  <p className={SocialStyle.text1}>{comment.comment}</p>

                  {/* 除了攝影機小圖 + 電影名稱以外的部分 */}
                  <div className={SocialStyle.user}>
                    <div className="d-flex justify-content-between">
                      {/* 包含個人頭像 & userName + 發送日期 */}
                      <div className="d-flex ">
                        {/* 個人頭像 */}
                        {/* <div className={SocialStyle.userphoto}>
                          <img
                            className="img-fluid rounded-circle"
                            // src={require("photo.jpg")}
                            // src={require(`../../img/${comment.pictureName}`)}
                            src={require(`../../img/photo.jpg`)}
                            alt="userPhoto"
                          />
                        </div> */}
                        {/* userName + 發送日期 */}
                        <div className={SocialStyle.userinfo}>
                          {/* <p className={SocialStyle.username1}>
                            {comment.userName}
                          </p> */}
                          {/* <p className={SocialStyle.date}>
                            {targetLocalDate(comment.sendTime)}
                          </p> */}
                        </div>
                      </div>
                      {/* star */}
                      {/* <StaticStart rating={comment.score} /> */}
                    </div>

                    {/* <p className={SocialStyle.text1}>{comment.comment}</p> */}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: "red", fontSize: "20px" }}>尚未進行評論</div>
            )}
          </SmartMasonry>
        </div>

        {/* 片單 */}
        <div className={toggleState === 2 ? Tabb.activecontent : Tabb.content}>
          <PlayListArea userID={userID} />
        </div>
      </div>
    </div>
  );
}

export default Tabs;
