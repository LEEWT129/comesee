import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import HS from "../../css/home/homePage.module.css";

const ComingSoon = () => {
  const history = useHistory();
  const [slideData, setSlideData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2407/filmlist/comingsoon")
      .then((res) => {
        setSlideData(res.data.slice(0, 10));
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const goTime = (id) => {
    history.push(`/info/${id}?tab=time`);
  };
  const goStory = (id) => {
    history.push(`/info/${id}?tab=story`);
  };

  return (
    <>
      <div className={HS.bar}>
        <h1 className={HS.title}>即將上映 ::</h1>
        <Link to="/list?tab=comingsoon" className={HS.more}>
          <span>看更多</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            fill="currentColor"
            className="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </Link>
      </div>

      <div className={HS.box}>
        <div className={HS.Btext}>COMING SOON</div>
        <Swiper
          slidesPerView={5}
          spaceBetween={50}
          freeMode={true}
          navigation={true}
          modules={[Navigation, FreeMode]}
          className="ListSwiper"
        >
          {slideData.map((filmPoster, index) => (
            <SwiperSlide className={HS.imgContainer} key={index}>
              <img
                className={HS.listSlide}
                id={filmPoster.id}
                src={filmPoster.imageUrl}
                alt=" "
              />
              <div className={HS.btnblock}>
                <button
                  className={HS.imgBtn}
                  onClick={() => goTime(filmPoster.id)}
                >
                  立即訂票
                </button>
                <button
                  className={HS.imgBtn}
                  onClick={() => goStory(filmPoster.id)}
                >
                  電影介紹
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ComingSoon;
