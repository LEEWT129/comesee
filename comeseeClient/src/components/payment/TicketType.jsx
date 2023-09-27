import React, { Component } from "react";
import DT from "../../css/payment/discount_tickettype.module.css";
import NumButton from "./NumButton";
import Sidebar from "./Sidebar";
import SwitchBtn from "./SwitchBtn";
import Rank from "./Rank";
import Swal from "sweetalert2";

import TicketContext from "../../TicketContext";

class TicketType extends Component {
  static contextType = TicketContext; //設定使用context

  // 小計
  componentDidUpdate() {
    const subtotal = this.ticketCost() + this.foodCost();
    if (subtotal !== this.context.state.subtotal) {
      this.context.setSubtotal(subtotal);
    }
  }

  render() {
    const { state } = this.context;

    return (
      <div className={DT.mainBg}>
        <div className={"container " + DT.contentBackground}>
          {/* 上半部 */}
          <div className={"row d-flex " + DT.movieInfo}>
            <div className={"col-4 " + DT.movieImage}>
              {/* 電影圖片 */}
              <img src={state.bookingInfo.imageUrl} alt="電影圖片" />
            </div>
            <div className="col-8">
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
                    : {state.maxSelectedSeats}
                  </span>
                </div>
                <div className={DT.contentTitle}>
                  座位
                  <span className={DT.content}> : {state.seatNumber}</span>
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
              <Sidebar currentPage="選擇票種" />
            </div>
            <div className={"col " + DT.discountConent}>
              {/* col 裡面再分兩個row */}
              <div className={"row " + DT.discountTicket}>
                {/* row 裡面再分4個col */}
                <div className={"col-2 " + DT.discountTitle}>選取票種</div>
                {/* 票種 */}
                <div className={"col-3 " + DT.discountList}>
                  {state.ticketName.map((name, index) => (
                    <div key={index}>{name}</div>
                  ))}
                </div>
                {/* 票種金額 */}
                <div className={"col-1 " + DT.discountList}>
                  {state.ticketMoney.map((money, index) => (
                    <div key={index}>${money}</div>
                  ))}
                </div>
                <div className={"col " + DT.discountList}>
                  <div>
                    <NumButton
                      maxValue={state.maxSelectedSeats}
                      value={state.adultTickets}
                      onChange={(value) =>
                        this.ticketsNum("adultTickets", value)
                      }
                    />
                  </div>
                  <div>
                    <NumButton
                      maxValue={state.maxSelectedSeats}
                      value={state.studentTickets}
                      onChange={(value) =>
                        this.ticketsNum("studentTickets", value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className={"row " + DT.discountFood}>
                {/* row 裡面再分4個 col */}
                <div className={"col-2 " + DT.discountTitle}>餐點加購</div>
                {/* 餐點種類 */}
                <div className={"col-3 " + DT.discountList}>
                  {state.foodName.map((food, index) => (
                    <div key={index}>{food}</div>
                  ))}
                </div>
                {/* 餐點金額 */}
                <div className={"col-1 " + DT.discountList}>
                  {state.foodMoney.map((money, index) => (
                    <div key={index}>${money}</div>
                  ))}
                </div>
                <div className={"col " + DT.discountList}>
                  <div>
                    <NumButton
                      maxValue={state.maxSelectedSeats}
                      value={state.popcornL}
                      onChange={(value) => {
                        this.ticketPopcorn("popcornL", value);
                      }}
                    />
                  </div>
                  <div>
                    <NumButton
                      maxValue={state.maxSelectedSeats}
                      value={state.popcornS}
                      onChange={(value) => {
                        this.ticketPopcorn("popcornS", value);
                      }}
                    />
                  </div>
                  <div>
                    <NumButton
                      maxValue={state.maxSelectedSeats}
                      value={state.colaL}
                      onChange={(value) => {
                        this.ticketCola("colaL", value);
                      }}
                    />
                  </div>
                  <div>
                    <NumButton
                      maxValue={state.maxSelectedSeats}
                      value={state.colaS}
                      onChange={(value) => {
                        this.ticketCola("colaS", value);
                      }}
                    />
                  </div>
                </div>
                <div className={"row " + DT.ticketAdd}>
                  <div className="col">
                    電影票<span style={{ fontSize: '36px' }}>&nbsp;{this.ticketCost()}&nbsp;</span>元，
                    餐點加購<span style={{ fontSize: '36px' }}>&nbsp;{this.foodCost()}&nbsp;</span>元，
                    小計<span style={{ fontSize: '36px' }}>&nbsp;{state.subtotal}&nbsp;</span>元
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 上一頁  下一頁 */}
          <SwitchBtn next="/discount" disabled={!state.canProceed} />
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

  // 票的種類數量限制
  ticketsNum = (field, value) => {
    // console.log(field) // 票的種類
    // console.log(value) // 幾張
    // console.log(typeof value)
    var numValue = parseInt(value, 10); //10進位
    var { adultTickets, studentTickets, maxSelectedSeats } = this.context.state;
    let otherTickets = field === "adultTickets" ? studentTickets : adultTickets;

    // console.log(adultTickets);

    if (numValue + otherTickets > maxSelectedSeats) {
      Swal.fire({
        title: '請選擇正確的電影票數量',
        icon: 'warning',
        confirmButtonText: "確定",
      }
      )
      return;
    }

    this.context.setState({ [field]: isNaN(numValue) ? 0 : numValue });
    this.checkIfCanProceed();
  };

  // 爆米花種類數量限制
  ticketPopcorn = (field, value) => {
    let numValue = parseInt(value, 10); //10進位.
    let { popcornL, popcornS, maxSelectedSeats } = this.context.state;
    let otherPopcorn = field === "popcornL" ? popcornS : popcornL;
    // console.log(popcornL);
    // console.log(popcornS);

    if (otherPopcorn + numValue > maxSelectedSeats) {
      // this.setState({ popcornL: 0, popcornS: 0 });
      // 超過總票數跳出提醒
      Swal.fire({
        title: '爆米花總數量不能超過電影票張數',
        icon: 'warning',
        confirmButtonText: "確定",
      }
      )
      return;
    }

    this.context.setState({ [field]: isNaN(numValue) ? 0 : numValue }, () => {
      this.checkIfCanProceed();
    });
  };

  // 可樂種類數量限制
  ticketCola = (field, value) => {
    let numValue = parseInt(value, 10); //10進位
    let { colaL, colaS, maxSelectedSeats } = this.context.state;
    let otherCola = field === "colaL" ? colaS : colaL;

    if (otherCola + numValue > maxSelectedSeats) {
      // 超過總票數跳出提醒
      Swal.fire({
        title: '可樂總數量不能超過電影票張數',
        icon: 'warning',
        confirmButtonText: "確定",
      }
      )
      return;
    }

    this.context.setState({ [field]: isNaN(numValue) ? 0 : numValue }, () => {
      this.checkIfCanProceed();
    });
  };

  ticketCost = () => {
    const { adultTickets, studentTickets } = this.context.state;
    // console.log(adultTickets)
    const adultPrice = 350;
    const studentPrice = 300;

    const totalTicketCost =
      adultTickets * adultPrice + studentTickets * studentPrice;

    const totalCost = totalTicketCost;
    return totalCost;
  };

  foodCost = () => {
    const { popcornL, popcornS, colaL, colaS } = this.context.state;
    const popcornLPrice = 120;
    const popcornSPrice = 80;
    const colaLPrice = 50;
    const colaSPrice = 35;

    const totalPopcornCost =
      popcornL * popcornLPrice + popcornS * popcornSPrice;
    const totalColaCost = colaL * colaLPrice + colaS * colaSPrice;

    const foodTotalCost = totalPopcornCost + totalColaCost;
    return foodTotalCost;
  };

  checkIfCanProceed = (index, value) => {
    const { adultTickets, studentTickets, maxSelectedSeats } =
      this.context.state;
    const totalTickets = adultTickets + studentTickets + 1;

    // console.log(adultTickets)
    // console.log(studentTickets)
    // console.log(maxSelectedSeats)
    // console.log(totalTickets);

    if (totalTickets === maxSelectedSeats) {
      this.context.setState({ canProceed: true });
    } else {
      this.context.setState({ canProceed: false });
    }
  };
}

export default TicketType;
