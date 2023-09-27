import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DT from "../../css/payment/discount_tickettype.module.css";
import NumButton from "./NumButton";
import Sidebar from "./Sidebar";
import SwitchBtn from "./SwitchBtn";
import axios from "axios";
import Rank from "./Rank";

import TicketContext from "../../TicketContext";

class Discount extends Component {
  state = {
    myPoint: 0,
    coupons: [],
  };

  static contextType = TicketContext; //設定使用context

  // 一開始的總計等於小計
  componentDidMount() {
    // 在 componentDidMount 中設定 total 的值為 subtotal
    const { subtotal } = this.context.state;
    this.setState({ total: subtotal });

    // 獲得後端的紅利
    axios
      .get(`http://localhost:2407/bonus/${this.context.state.userID}`)
      .then((response) => {
        this.setState({ myPoint: response.data[0].myPoint || 0 });
      })
      .catch((error) => {
        console.error("myPoint:", error);
      });

    // 從後端獲取優惠券
    axios
      .get(`http://localhost:2407/coupon/${this.context.state.userID}`)
      .then((response) => {
        const coupons = response.data;
        this.setState({ coupons });
      })
      .catch((error) => {
        console.error("Error fetching coupons:", error);
      });
  }

  // 更新總計金額
  componentDidUpdate() {
    const { subtotal, usePoint, couponDiscount } = this.context.state;
    const total = subtotal - (this.discountPoint(usePoint) + couponDiscount);
    if (total !== this.context.state.total) {
      this.context.setTotal(total);
    }
  }

  render() {
    const { state } = this.context;

    // 渲染後端紅利
    const { myPoint } = this.state;

    // 設定最多只能只用幾點紅利點數
    const maxValue = Math.min(myPoint, 2000);

    return (
      <div className={DT.mainBg}>
        <div className={"container " + DT.contentBackground}>
          {/* 上半部 */}
          <div className={"row " + DT.movieInfo}>
            <div className={"col-4 " + DT.movieImage}>
              {/* 電影圖片 */}
              <img src={state.bookingInfo.imageUrl} alt="電影圖片" />
            </div>
            <div className={"col-8 " + DT.movieIfon}>
              <div className={DT.movieName}>
                {/* 電影中文名 */}
                <span className={DT.movieNameC}>
                  {state.bookingInfo.movieNameCN}
                </span>
                {/* 普 0+ */}
                <Rank rank={state.bookingInfo.rank} />
                {/* 電影英文名 */}
                <p className={DT.movieNameE}>{state.bookingInfo.movieNameEN}</p>
              </div>
              <div className={DT.movieContent}>
                <div className={DT.contentTitle}>
                  影城
                  <span className={DT.content}>
                    {" "}
                    : {state.bookingInfo.cinemaName}
                  </span>
                </div>
                <div className={DT.contentTitle}>
                  影廳
                  <span className={DT.content}>
                    {" "}
                    : {state.bookingInfo.theater}
                  </span>
                </div>
                <div className={DT.contentTitle}>
                  時段
                  <span className={DT.content}>
                    {" "}
                    :{" "}
                    <span>{this.targetLocalDate(state.bookingInfo.date)}</span>
                    &nbsp;
                    {/* 星期幾 */}
                    <span>
                      {this.targetWeek(
                        this.targetLocalDate(state.bookingInfo.date)
                      )}
                    </span>
                    &nbsp;
                    {/* 時間 */}
                    <span>{state.bookingInfo.startTime}</span>
                  </span>
                </div>
                <div className={DT.contentTitle}>
                  張數
                  <span className={DT.content}>
                    {" "}
                    : 全票 {state.adultTickets} 張 , 學生票{" "}
                    {state.studentTickets} 張
                  </span>
                </div>
                <div className={DT.contentTitle}>
                  座位
                  <span className={DT.content}> : {state.seatNumber}</span>
                </div>
                <div className={DT.contentTitle}>
                  加購
                  <span className={DT.content}>
                    {" "}
                    : 爆米花(大)*{state.popcornL} , 爆米花(小)*{state.popcornS}{" "}
                    , 可樂(大)*{state.colaL} , 可樂(小)*{state.colaS}
                  </span>
                </div>
              </div>
            </div>
          </div>

           {/* 中間白線 */}
           <div className={DT.loader}>
            <div class={DT.tracker}></div>
          </div>

          {/* 下半部 */}
          <div className="row">
            <div className={"col-3 " + DT.mySidebar}>
              <Sidebar currentPage="選擇優惠" />
            </div>
            <div className={"col " + DT.discountConent}>
              {/* col 裡面再分兩個row */}
              <div className={"row " + DT.discountTicket}>
                {/* row 裡面再分4個col */}
                <div className={"col-2 " + DT.discountTitle}>會員紅利</div>
                <div className={"col-3 " + DT.discountList}>
                  <div>你的紅利點數</div>
                  <div>本次可使用紅利點數</div>
                </div>
                <div className={"col " + DT.discountList}>
                  <div className={DT.pLogoBg}>P</div>
                  <div className={DT.pointsP}>目前點數&ensp;{myPoint}&ensp;點</div>
                  <div>
                    本次使用&emsp;
                    <NumButton
                      stepValue="500"
                      value={state.usePoint}
                      maxValue1={maxValue}
                      maxValue2={maxValue}
                      onChange={this.numBtnChange}
                    />{" "}
                    &emsp;點
                  </div>
                  <div className={DT.pointsNote}>
                    500 點 80 元，每次最高可折抵 2000 點
                  </div>
                </div>
              </div>
              <div className={"row " + DT.discountFood}>
                {/* row 裡面再分4個 col */}
                <div className={"col-2 " + DT.discountTitle}>優 惠 券</div>
                <div className={"col-3 " + DT.discountList}>
                  <div>可使用的優惠券</div>
                </div>
                <div className={"col " + DT.discountList}>
                  <select
                    className={DT.discountSelect}
                    onChange={this.couponChange}
                    value={state.selectedCoupon}
                  >
                    <option value="">請選擇優惠券</option>
                    {this.state.coupons.map((coupon, index) => (
                        // console.log(coupon)
                      <option key={index} value={coupon.id}>
                        {coupon.couponID}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={"row " + DT.discountAdd}>
                  <div className="col">
                    金額<span style={{ fontSize: '36px' }}>&nbsp;{state.subtotal}&nbsp;</span>元，
                    可折抵<span style={{ fontSize: '36px' }}>&nbsp;{this.discountPoint(state.usePoint) + state.couponDiscount}&nbsp;</span>元，
                    小計<span style={{ fontSize: '36px' }}>&nbsp;{state.total}&nbsp;</span>元
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 上一頁  下一頁 */}
          <SwitchBtn next="/confirm" />
        </div>
      </div>
    );
  }

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

  numBtnChange = (newValue) => {
    // console.log( newValue);
    this.context.setState({ usePoint: newValue });
    const newDiscount = this.discountPoint(newValue);
    // console.log(newDiscount)
    this.context.setDiscount(newDiscount);
  };

  discountPoint = (points = 0) => {
    var rate = 80 / 500; // 每點能折抵的金額
    return points * rate; // 點數 x 折抵率
  };

  couponChange = (event) => {
    // console.log(event)
    // console.log(event.target.options)
    // console.log(event.target.options[event.target.selectedIndex])

    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedText = selectedOption.text; //選項的value值
    // const selectedValue = selectedOption.value; // 選項的內容

    // console.log(selectedText);

    this.context.setSelectedCoupon(selectedText); // 如果你需要value值
  };
}

export default withRouter(Discount);
