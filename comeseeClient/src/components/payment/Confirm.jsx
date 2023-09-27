import React, { Component } from "react";
import CPC from '../../css/payment/cpc.module.css';
import Sidebar from "./Sidebar";
import SwitchBtn from "./SwitchBtn";
import Rank from "./Rank";

import TicketContext from "../../TicketContext";


class Confirm extends Component {

  static contextType = TicketContext //設定使用context


  render() {
    const { state } = this.context;

    return (
      <div className={CPC.mainBg}>
        <div className={"container " + CPC.contentBackground}>
          <div className="row">
            <div className={"col-3 " + CPC.cpcSidebar}>
              <Sidebar currentPage="訂票資訊確認" />
            </div>
            <div className={"col-8"}>
              <div className={CPC.movieName}>
                {/* 電影中文名 */}
                <span className={CPC.movieNameC}>{state.bookingInfo.movieNameCN}</span>
                {/* 普 0+ */}
                <Rank rank={state.bookingInfo.rank}/>
                {/* 電影英文名 */}
                <p className={CPC.movieNameE}>{state.bookingInfo.movieNameEN}</p>
              </div>
              <div className={CPC.movieContentConfirm}>
                <div className={CPC.contentTitle}>
                  影城<span className={CPC.content}> : {state.bookingInfo.cinemaName}</span>
                </div>
                <div className={CPC.contentTitle}>
                  影廳<span className={CPC.content}> : {state.bookingInfo.theater}</span>
                </div>
                <div className={CPC.contentTitle}>
                  時段
                  <span className={CPC.content}> : {" "}
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
                    <span>{state.bookingInfo.startTime}</span></span>
                </div>
                <div className={CPC.contentTitle}>
                  張數<span className={CPC.content}> : 全票 {state.adultTickets} 張 , 學生票 {state.studentTickets} 張</span>
                </div>
                <div className={CPC.contentTitle}>
                  座位<span className={CPC.content}> : {state.seatNumber}</span>
                </div>
                <div className={CPC.contentTitle}>
                  加購
                  <span className={CPC.content}> : 爆米花(大)*{state.popcornL} , 爆米花(小)*{state.popcornS} , 可樂(大)*{state.colaL} , 可樂(小)*{state.colaS}
                  </span>
                </div>
                <div className={CPC.contentTitle}>
                  優惠
                  <span className={CPC.content}>
                    {" "}
                    : 紅利點數 - 折抵 {state.discount} 元, 優惠券 : {state.selectedCoupon} - 折抵 {state.couponDiscount} 元
                  </span>
                </div>
                <div className={CPC.confirmTitle}>總計：<span style={{fontSize:'32px'}}>{state.total}</span>&ensp;元</div>
              </div>
            </div>
          </div>
          <div>
            <SwitchBtn next="/Payment" />
          </div>

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
}

export default Confirm;
