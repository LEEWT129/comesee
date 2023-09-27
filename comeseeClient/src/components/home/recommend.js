import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Navigation, FreeMode } from "swiper/modules";
import HS from "../../css/home/homePage.module.css";

import TicketContext from "../../TicketContext";

class Recommend extends Component {
  static contextType = TicketContext; //設定使用context

  state = {
    recommendedMovies: [],
  };

  goTime = (id) => {
    this.props.history.push(`/info/${id}?tab=time`);
    window.scrollTo(0, 0);
  };

  goStory = (id) => {
    this.props.history.push(`/info/${id}?tab=story`);
    window.scrollTo(0, 0);
  };



  render() {
    return (
      <>
        <div className={HS.bar}>
          <div>
            <h1 className={HS.title}>為您推薦 ::</h1>
            <h5 className={HS.tips}>根據您喜歡的類型，您可能會喜歡</h5>
          </div>
        </div>

        <div className={HS.box}>
          <div className={HS.Btext} style={{ fontSize: "225px" }}>
            YOU MAY ALSO LIKE
          </div>
          <Swiper
            slidesPerView={5}
            spaceBetween={50}
            freeMode={true}
            navigation={true}
            modules={[Navigation, FreeMode]}
            className="ListSwiper"
          >
            {this.state.recommendedMovies.map((filmPoster, index) => {
              return (
                <SwiperSlide className={HS.imgContainer} key={index}>
                  <img
                    className={HS.listSlide}
                    src={filmPoster.imageUrl}
                    alt=" "
                  />
                  <div className={HS.btnblock}>
                    <button className={HS.imgBtn} onClick={() => this.goTime(filmPoster.id)}>立即訂票</button>
                    <button className={HS.imgBtn} onClick={() => this.goStory(filmPoster.id)}>電影介紹</button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </>
    );
  }

  // 從後端拿到推薦電影
  async componentDidMount() {
    if (!this.context.state.userID) {
      const res = await axios.get(
        `http://localhost:2407/recommend/home/7`
      );
      const recommendedMovies = Array.isArray(res.data) ? res.data : [res.data];
      this.setState({ recommendedMovies });
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:2407/recommend/home/${this.context.state.userID}`
      );
      // console.log('this.context.state.userID'+this.context.state.userID);
      // console.log("Response:", res);
      // console.log("Response data:", res.data);
      const recommendedMovies = Array.isArray(res.data) ? res.data : [res.data];
      console.log("Recommended movies:", recommendedMovies);
      this.setState({ recommendedMovies });
    } catch (error) {
      console.error(error);
    }
  }



}

export default withRouter(Recommend);
