import React, { useState,useEffect,useCallback} from "react";
import member from "../../css/member/member.module.css";

const WatchedOrder = ({ orderdetail }) => {
  const [countdown, setCountdownDays] = useState(null);
  const [isVisible, setIsVisible] = useState(false); 

  const handleButtonClick = () => {
    const movieId = orderdetail.movieID;
    window.location.href = `http://localhost:3000/info/${movieId}?tab=comment`;  
  };



  const calculateCountdown = useCallback(() => {
    //useCallback=>減少子元件重新再計算渲染

    // 電影播放日期
    const showtimeDate = new Date(orderdetail.showtimeDate);
    // 今日日期
    const today = new Date();
    // 差距
    const difference = showtimeDate - today;
    // 剩餘的天數
    const daysRemaining = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (daysRemaining < 0) {
      // 觀看紀錄=>???
      setCountdownDays("已觀看");
      setIsVisible(true); 
    } else {
      setCountdownDays(daysRemaining);
    }
  },[orderdetail.showtimeDate]);


  useEffect(() => {
    // 計算觀看倒數
    calculateCountdown();
  }, [calculateCountdown]);

  return (
    <div className={`${member.order} ${isVisible ? "" : member.hidden}`}>
    <div className={member.order}>
      <div>
        <img
          className={member.film2}
          src={orderdetail.imageUrl}
          alt="已觀看"
        />
      </div>
      <div className={member.orderdetail}>
          <table className={`col-9 ${member.desc}`} style={{ lineHeight: "180%" }}>
            <tbody className={member.movie}>
              <tr>
                <th style={{ width:"50px" }} scope="row">電影</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span>
                    {orderdetail.movieNameCN}({orderdetail.movieNameEN})
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">影城</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span>{orderdetail.cinemaName}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">影廳</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span>
                    {orderdetail.theaterName}
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">時段</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span>
                  {orderdetail.showtimeDate}
                  </span>
                  &nbsp;&nbsp;
                  <span>
                    ({orderdetail.dayOfWeek})
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">張數</th>
                <td style={{ paddingLeft: "20px" }}>
                  全票:
                  <span>
                    {orderdetail.adult}張
                  </span>
                  &nbsp;&nbsp;學生票:
                  <span>
                    {orderdetail.student}張
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">座位</th>
                <td style={{ paddingLeft: "20px" }}>
                  <span>
                    {orderdetail.seat}
                  </span>
                  &nbsp;
                </td>
              </tr>
              <tr>
                <th scope="row">優惠</th>
                <td style={{ paddingLeft: "20px" }}>
                  紅利點數折抵
                  <span style={{ textDecoration: "underline" }}>
                    {orderdetail.bonus}
                  </span>
                  元
                </td>
              </tr>
              <tr>
                <th />
                <td style={{ paddingLeft: "20px" }}>
                  優惠卷&nbsp;
                  <span style={{ textDecoration: "underline" }}>
                    {orderdetail.couponID}
                  </span>
                </td>
              </tr>
            </tbody>
          </table >
        <div className={`col-3 ${member.rightcontent}`}>
          {/* <div>觀看倒數</div> */}
          <div className={member.watchedtext}>
            {countdown === "已觀看" ? countdown : `${countdown}`}
            {/* <span className={member.text}>天</span> */}
          </div>
          <button className={member.button} onClick={handleButtonClick}>
            撰寫評論
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default WatchedOrder;
