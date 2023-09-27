import React, { Component } from "react";
import CPC from "../../css/payment/cpc.module.css";
import Sidebar from "./Sidebar";
import BtnLargeHover from "./btnLargeHover";
import ImgHover from "./ImgHover";
import axios from "axios";

import TicketContext from "../../TicketContext";

class PaymentCompleted extends Component {
  static contextType = TicketContext; //設定使用context

  state = {
    recommendedMovies: [],
  };

  render() {
    // console.log("Recommended Movies:", this.state.recommendedMovies);
    return (
      <div className={CPC.mainBg}>
        <div className={"container " + CPC.contentBackground}>
          <div className="row">
            <div className={"col-3 " + CPC.cpcSidebar}>
              <Sidebar currentPage="購票完成" />
            </div>
            <div className="col">
              <div className={CPC.completeRight}>
                <p className={CPC.completeP1}>購票完成</p>
                <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    className={CPC.circle}
                    fill="none"
                    stroke="#68E534"
                    stroke-width="8"
                    cx="40"
                    cy="40"
                    r="35"
                    transform="rotate(-90 40 40)"
                  />
                  <polyline
                    className={CPC.tick}
                    fill="none"
                    stroke="#68E534"
                    stroke-width="8"
                    points="20,40 30,50 60,20"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className={CPC.completeP2} style={{ marginTop: "20px" }}>
                  感謝您的訂購
                </p>

                <p className={CPC.completeP2}>可至會員中心查詢訂票紀錄</p>
              </div>
              <div
                className={CPC.completeRight}
                style={{ justifyContent: "center", marginTop: "30px" }}
              >
                <BtnLargeHover label="回首頁" onClick={this.goHome} />
                <BtnLargeHover label="會員中心" onClick={this.goMemberCenter} />
              </div>
              <div className={CPC.recommend}>
                <p>你 可 能 感 興 趣 . . .</p>

                {this.state.recommendedMovies.map((movieInfo, index) => {
                  // console.log(movieInfo)
                  return (
                    <span key={index}>
                      <ImgHover
                        src={movieInfo.imageUrl}
                        alt="電影圖"
                        movieId={movieInfo.id}
                        onBuyClick={() => this.goBuy(movieInfo.id)}
                        onMovieClick={() => this.goMovie(movieInfo.id)}
                      />
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 從後端拿到推薦電影

  async componentDidMount() {
    try {
      const res = await axios.get(
        `http://localhost:2407/recommend/${this.context.state.bookingInfo.movieID}`
      );
      // console.log('this.context.state.bookingInfo'+this.context.state.bookingInfo.movieID);
      // console.log("Response:", res);
      // console.log("Response data:", res.data);
      const recommendedMovies = Array.isArray(res.data) ? res.data : [res.data];
      // console.log("Recommended movies:", recommendedMovies);
      this.setState({ recommendedMovies });
    } catch (error) {
      console.error(error);
    }
  }

  goHome = () => {
    this.props.history.push("/");
    window.scrollTo(0, 0);
  };

  goMemberCenter = () => {
    this.props.history.push("/Member");
    window.scrollTo(0, 0);
  };

  goBuy = (movieID) => {
    this.props.history.push(`/info/${movieID}?tab=time`);
    window.scrollTo(0, 0);
  };

  goMovie = (movieID) => {
    this.props.history.push(`/info/${movieID}?tab=story`);
    window.scrollTo(0, 0);
  };
}

export default PaymentCompleted;
