import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import HS from "../../css/home/homePage.module.css";

import Img1 from "../../img/cover-1.jpg";
import Img2 from "../../img/cover-2.png";
import Img3 from "../../img/cover-3.png";

import { Autoplay, EffectFade, Pagination } from "swiper/modules";

class HomePageCover extends Component {
  state = {};

  render() {
    return (
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect={"fade"}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade, Pagination]}
        className={HS.swiper}
      >
        <SwiperSlide className={HS.slide}>
          <img src={Img1} className={HS.Img} alt=" " />
        </SwiperSlide>
        <SwiperSlide className={HS.slide}>
          <img src={Img2} className={HS.Img} alt=" " />
        </SwiperSlide>
        <SwiperSlide className={HS.slide}>
          <img src={Img3} className={HS.Img} alt=" " />
        </SwiperSlide>
      </Swiper>
    );
  }
}

export default HomePageCover;
