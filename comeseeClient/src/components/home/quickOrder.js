import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import TicketContext from "../../TicketContext";
import Swal from "sweetalert2";
import axios from "axios";

import HS from "../../css/home/homePage.module.css";

const QuickOrder = () => {
  const { state, setState } = useContext(TicketContext); // 設定使用context
  const history = useHistory();

  const [orderCinema, setOrderCinema] = useState([]);
  const [orderMovieList, setOrderMovieList] = useState([]);
  const [orderDate, setOrderDate] = useState([]);
  const [orderShowTime, setOrderShowTime] = useState([]);

  // 快速訂票
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [showModal, setShowModal] = useState(false);

  // console.log(selectedCinema)      // 影城1or2
  // console.log(selectedMovie)       // movieID,theaterID
  // console.log(selectedDate)        // 場次時間 2023-00-00
  // console.log(selectedShowtime)    // startTime
  // console.log(selectedNumber)      // 選擇人數

  // 後端抓取影城選項
  useEffect(() => {
    axios
      .get("http://localhost:2407/quickorder")
      .then((res) => {
        setOrderCinema(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  // 影城選擇事件處理
  async function handleCinemaChange(e) {
    if (state.userID === null) {
      const result = await Swal.fire({
        title: "請先登入會員",
        icon: "warning",
        confirmButtonText: "確認",
      });

      if (result.isConfirmed) {
        window.location.href = "/login";
      }
    } else {
      setSelectedCinema(e.target.value);
      setSelectedMovie("");
      setSelectedDate("");
      setSelectedShowtime("");
      setSelectedNumber("");
    }
  }

  // 篩選影片選項
  useEffect(() => {
    axios
      .get(`http://localhost:2407/quickorder/movielist/${selectedCinema}`)
      .then((res) => {
        setOrderMovieList(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [selectedCinema]);

  // 影片選擇事件處理
  function handleMovieChange(e) {
    setSelectedMovie(e.target.value);
    setSelectedDate("");
    setSelectedShowtime("");
    setSelectedNumber("");
  }

  // 篩選日期選項
  useEffect(() => {
    let mt = selectedMovie.split(",");
    axios
      .post("http://localhost:2407/quickorder/getDate", {
        movieID: parseInt(mt[0]),
        cinemaID: selectedCinema,
        theaterID: parseInt(mt[1]),
      })
      .then((res) => {
        // 刪除res.data多餘的內容
        // "date": "2023-09-02T16:00:00.000Z" => 刪去T之後的字串
        // 再map出新的modifiedData 去設置orderDate的state
        const modifiedData = res.data.map((item) => {
          // 將原始日期字串轉換成 JavaScript 的日期物件
          const originalDate = new Date(item.date);
          // 將日期加一天
          originalDate.setDate(originalDate.getDate() + 1);
          // 取得加一天後的日期字串
          const nextDayDate = originalDate.toISOString().split("T")[0];
          return {
            date: nextDayDate,
          };
          // date: item.date.split("T")[0]
        });
        setOrderDate(modifiedData);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [selectedMovie, selectedCinema]);

  // 日期選擇事件處理
  function handleDateChange(e) {
    setSelectedDate(e.target.value);
    setSelectedShowtime("");
    setSelectedNumber("");
  }

  // 篩選場次選項
  useEffect(() => {
    axios
      .post("http://localhost:2407/quickorder/getStartTime", {
        movieID: selectedMovie,
        cinemaID: selectedCinema,
        date: selectedDate,
      })
      .then((res) => {
        setOrderShowTime(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    // console.log(selectedDate);
  }, [selectedMovie, selectedCinema, selectedDate]);

  // 場次選擇事件處理
  function handleShowtimeChange(e) {
    setSelectedShowtime(e.target.value);
    setSelectedNumber("");
  }

  // 人數選擇事件處理
  function handleNumberChange(e) {
    setSelectedNumber(e.target.value);
  }

  // 取得showtimeID 跟 使用者選擇數量 更新到context
  function handleShowtimID() {
    const [movieID, theaterID] = selectedMovie.split(",");

    // 相對應資料傳後端
    const requestData = {
      movieID: movieID,
      cinemaID: selectedCinema,
      theaterID: theaterID,
      startTime: selectedShowtime,
      date: selectedDate,
    };

    // console.log(requestData.movieID)
    // console.log(requestData.cinemaID)
    // console.log(requestData.theaterID)
    // console.log(requestData.startTime)
    // console.log(requestData.date)

    // 拿到 showtimeID
    axios
      .post("http://localhost:2407/quickorder/getShowtimeID", requestData)
      .then((res) => {
        // console.log(res)
        const showtimeID = res.data[0].showtimeID;
        console.log("showtimeID：", showtimeID);

        axios
          .get(`http://localhost:2407/quickorder/emptySeat/${showtimeID}`)
          .then((res) => {
            const emptySeat = res.data.emptySeat;
            console.log("空座位數：", emptySeat);

            // 位置數量ok
            if (parseInt(selectedNumber) <= emptySeat) {
              setState({ showtimeID: showtimeID });
              setState({ maxSelectedSeats: parseInt(selectedNumber) });
              history.push("/bookingseat");
              window.scrollTo(0, 0);
            } else {
              // 位置數不夠
              Swal.fire({
                title: "您目前所選的時段已無空位",
                text: "請重新選擇",
                icon: "warning",
                confirmButtonText: "確認",
              });
              return;
            }
          });
      })
      .catch((err) => {
        console.log("showtimeID取得失敗:" + err.response);
      });
  }

  return (
    <>
      {/* 快速訂票 */}
      <form className={HS.Order}>
        <div className={HS.subtitle} style={{ marginBottom: "40px" }}>
          快速訂票
        </div>

        {/* 選擇影城 */}
        <select
          value={selectedCinema}
          className={HS.mySelect}
          onChange={handleCinemaChange}
        >
          <option value="">請選擇影城</option>
          {/* map options */}
          {orderCinema.map((orderItem, index) => (
            <option key={index} value={orderItem.cinemaID}>
              {orderItem.cinemaName}
            </option>
          ))}
        </select>

        {/* 選擇影片 */}
        <select
          value={selectedMovie}
          className={HS.mySelect}
          onChange={handleMovieChange}
        >
          <option value="">請選擇影片</option>
          {/* map options */}
          {orderMovieList.map((orderItem, index) => (
            <option
              key={index}
              value={orderItem.movieID + "," + orderItem.theaterID}
            >
              {orderItem.movieName}
            </option>
          ))}
        </select>

        {/* 選擇日期 */}
        <select
          value={selectedDate}
          className={HS.mySelect}
          onChange={handleDateChange}
        >
          <option value="">請選擇日期</option>
          {/* map options */}
          {orderDate.map((orderItem, index) => (
            <option key={index} value={orderItem.date}>
              {orderItem.date}
            </option>
          ))}
        </select>

        {/* 選擇場次 */}
        <select
          value={selectedShowtime}
          className={HS.mySelect}
          onChange={handleShowtimeChange}
        >
          <option value="">請選擇場次</option>
          {/* map options */}
          {orderShowTime.map((orderItem, index) => (
            <option key={index} value={orderItem.startTime}>
              {orderItem.startTime}
            </option>
          ))}
        </select>

        <select
          value={selectedNumber}
          className={HS.mySelect}
          onChange={handleNumberChange}
        >
          <option value="">請選擇人數</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>

        <button type="button" className={HS.quickBtn} onClick={handleShowtimID}>
          即刻購票
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </form>
    </>
  );
};

export default QuickOrder;
