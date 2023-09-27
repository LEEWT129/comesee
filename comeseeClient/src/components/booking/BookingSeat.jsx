import React, { Component } from "react";
import axios from "axios";

import styles from "../../css/booking/bookingSeat.module.css";

import SwitchBtn from "./SwitchBtn";
// import Sidebar from "../payment/Sidebar";
import Sidebar from "./Sidebar";
import SeatSelectorClass from "./SeatSelectorClass";

import TicketContext from "../../TicketContext";

import Rank from "./Rank";

class BookingSeat extends Component {
  static contextType = TicketContext;

  state = {
    seatinfo: [],
    bookingInfo: [],
    numberOfEmptySeats: 0, //empty的座位有幾個
  };

  //更新剩餘幾個座位
  setNumberOfEmptySeats = (numberOfEmptySeats) => {
    this.setState({ numberOfEmptySeats: numberOfEmptySeats });
  };

  async componentDidMount() {
    //獲取傳入場次的相關資料放入bookingInfo
    await axios
      .get(
        `http://localhost:2407/booking/info/${this.context.state.showtimeID}`
      )
      .then((response) => {
        this.setState({ bookingInfo: response.data[0] });
        this.context.setState({ bookingInfo: response.data[0] });
      })
      .catch((error) => {
        // 在這裡處理錯誤
        console.error("位置讀取錯誤:", error);
        // console.log("123546");
      });

    //獲取該場次1的所有位置資訊
    await axios
      .get(`http://localhost:2407/seat/${this.context.state.showtimeID}`) //場次應該由props或context獲取
      .then((response) => {
        // console.log(response.data);
        this.setState({ ...this.state, seatinfo: response.data });

        //以下為找出empty的座位有幾個，並更新
        // 使用filter方法過濾出seatStatus為'empty'的紀錄
        let emptySeats = response.data.filter(
          (seat) => seat.seatStatus === "empty"
        );
        let numberOfEmptySeats = emptySeats.length; //座位為空的有幾個
        this.setNumberOfEmptySeats(numberOfEmptySeats); //使用函式設定numberOfEmptySeats
      })
      .catch((error) => {
        // 在這裡處理錯誤
        console.error("位置讀取錯誤:", error);
      });
  }

  // async componentDidMount() {
  //   try {
  //     // 获取傳入場次的相關資料放入bookingInfo
  //     const bookingResponse = await axios.get(
  //       "http://localhost:2407/booking/info/1"
  //     );
  //     this.setState({ bookingInfo: bookingResponse.data[0] });
  //     this.context.setState({ bookingInfo: bookingResponse.data[0] });

  //     // 获取該場次1的所有位置資訊
  //     const seatResponse = await axios.get("http://localhost:2407/seat/1");
  //     this.setState({ seatinfo: seatResponse.data });

  //     // 找出empty的座位有幾個，並更新
  //     const emptySeats = seatResponse.data.filter(
  //       (seat) => seat.seatStatus === "empty"
  //     );
  //     const numberOfEmptySeats = emptySeats.length;
  //     this.setNumberOfEmptySeats(numberOfEmptySeats);
  //   } catch (error) {
  //     // 在这里处理错误
  //     console.error("位置讀取錯誤:", error);
  //   }
  // }

  updateSeatStatus = (rowNumber, seatNumber, newStatus) => {
    const updatedSeatinfo = this.state.seatinfo.map((seat) => {
      if (seat.rowNumber === rowNumber && seat.seatNumber === seatNumber) {
        return { ...seat, seatStatus: newStatus };
      }
      return seat;
    });

    this.setState({ seatinfo: updatedSeatinfo });
    // console.log(this.state.seatinfo);
  };

  //判斷已選擇的座位數是否與最大座位應該選擇的數量相等
  handleNextStepClick = () => {
    const { selectedSeats, maxSelectedSeats } = this.context.state;

    // console.log(selectedSeats);

    // 如果已選擇的座位數等於maxSelectedSeats回傳true 不等於回傳false
    if (selectedSeats.length === maxSelectedSeats) {
      return true;
    } else {
      return false;
    }
  };

  //轉成localTime，傳入utc字串
  targetLocalDate = (utcStr) => {
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

  //將日期轉為星期
  targetWeek = (dateString) => {
    let date = new Date(dateString);

    // 獲取星期幾的數字，0代表星期日，1代表星期一，以此類推
    const dayOfWeek = date.getDay();

    const daysOfWeek = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    const dayOfWeekText = daysOfWeek[dayOfWeek];

    return dayOfWeekText;
  };

  render() {
    return (
      <div className={styles.main}>
        {/* 灰底 */}
        <div className={`container ${styles.grayBackground}`}>
          {/* 上半部 */}
          <div className={`${styles.top} d-flex row `}>
            {/* 電影圖 */}
            <div className={`${styles.movieImage} col-3`}>
              <img src={this.state.bookingInfo.imageUrl} alt="movieImage" />
            </div>

            {/* 電影資訊 */}
            <div className={`${styles.info} col-8`}>
              {/* 電影中英標題 */}
              <div className="title">
                <span className={styles.cnTitle}>
                  {this.state.bookingInfo.movieNameCN}
                </span>
                {/* <span className={styles.grade}>普 0+</span> */}
                <Rank rank={this.state.bookingInfo.rank} />
                <p className={styles.enTitle}>
                  {this.state.bookingInfo.movieNameEN}
                </p>
              </div>

              {/* 電影詳細資訊 */}
              <div className={styles.movieInfo}>
                <div>
                  <span>上映日期 : </span>
                  <span>
                    {this.targetLocalDate(this.state.bookingInfo.releaseDate)}
                  </span>
                  {/* <span>{this.state.bookingInfo.releaseDate}</span> */}
                </div>
                <div>
                  <span>片長 : </span>
                  <span>{this.state.bookingInfo.movieLength}</span>
                </div>
                <div>
                  <span>類型 : </span>
                  <span>{this.state.bookingInfo.movieType}</span>
                </div>
                <div>
                  <span>導演 : </span>
                  <span>{this.state.bookingInfo.director}</span>
                </div>
                <div className={styles.actorList}>
                  <span>演員 : </span>
                  <span>{this.state.bookingInfo.actor}</span>
                </div>
              </div>

              {/* 訂票資訊 */}
              <div className={styles.bookingInfo}>
                <div>
                  <span>影城 : </span>
                  <span>{this.state.bookingInfo.cinemaName}</span>
                </div>
                <div>
                  <span>影廳 : </span>
                  <span>{this.state.bookingInfo.theater}</span>
                </div>
                <div>
                  <span>時段 : </span>
                  {/* 日期 */}
                  <span>
                    {this.targetLocalDate(this.state.bookingInfo.date)}
                  </span>
                  &nbsp;
                  {/* <span>{this.state.bookingInfo.date}</span>&nbsp; */}
                  {/* 星期幾 */}
                  <span>
                    {this.targetWeek(
                      this.targetLocalDate(this.state.bookingInfo.date)
                    )}
                  </span>
                  &nbsp;
                  {/* 時間 */}
                  <span>{this.state.bookingInfo.startTime}</span>
                </div>
                <div>
                  <span>張數 : </span>
                  <span>{this.context.state.maxSelectedSeats}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 中間白線 */}
          {/* <div className={styles.line}></div> */}
          <div className={styles.loader}>
            <div class={styles.tracker}></div>
          </div>

          {/* 下半部 */}
          <div className={`${styles.down} row`}>
            {/* 左邊步驟 */}
            <div className={`col-3 ${styles.sidebar}`}>
              <Sidebar currentPage="選擇座位" />
            </div>
            {/* 右邊訂票區 */}
            <div className={`col-9 ${styles.seatArea}`}>
              <div className={styles.seatText}>
                <span>剩餘&nbsp;&nbsp;</span>
                {` ${this.state.numberOfEmptySeats} `}
                <span>&nbsp;&nbsp;個空位可選</span>
              </div>
              <div className={styles.screen}>
                <div className={styles.neonText}>screen</div>
              </div>
              {/* 座位區 */}
              <SeatSelectorClass
                seatinfo={this.state.seatinfo}
                updateSeatStatus={this.updateSeatStatus}
                numberOfEmptySeats={this.state.numberOfEmptySeats} //剩餘幾個座位
                setNumberOfEmptySeats={this.setNumberOfEmptySeats} //用來更新剩餘幾個座位
              />
              {/* 標示 */}
              <div className={styles.sample}>
                <div>
                  <div
                    // className={`${styles.square} ${styles.empty}`}
                    className={`${styles.square}`}
                    style={{ background: "#F1EFE9" }}
                  ></div>
                  <span>可選取</span>
                </div>
                <div>
                  <div
                    // className={`${styles.square} ${styles.selected}`}
                    className={`${styles.square}`}
                    style={{ background: "#64A26A" }}
                  ></div>
                  <span>已選取</span>
                </div>
                <div>
                  <div
                    // className={`${styles.square} ${styles.sold}`}
                    className={`${styles.square}`}
                    style={{ background: "#E12C4B" }}
                  ></div>
                  <span>無法選取</span>
                </div>
              </div>
            </div>
          </div>
          {/* 換頁按鈕 */}
          <SwitchBtn next="/TicketType" seatflag={this.handleNextStepClick()} />
        </div>
      </div>
    );
  }
}

export default BookingSeat;
