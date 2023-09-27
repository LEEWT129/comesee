import React, { Component } from "react";

import styles from "../../css/booking/seatSelectorClass.module.css";

import TicketContext from "../../TicketContext";

import Swal from "sweetalert2";

class SeatSelectorClass extends Component {
  static contextType = TicketContext;

  constructor(props) {
    super(props);
    this.state = {
      selectedSeats: [], // 初始化已選座位陣列
    };
    // 設置座位最多能選擇的數量
    // this.maxSelectedSeats = 5;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedSeats !== this.state.selectedSeats) {
      // selectedSeats 狀態已經更新
      // console.log(this.state.selectedSeats);

      // 在這裡進行其他相關操作，如更新 context 中的數據
      this.context.setState({
        selectedSeats: this.state.selectedSeats,
      });

      // console.log(this.context.state.selectedSeats);

      //若selectedSeats有被放入新的選擇到的位置則讓bookingseat.jsx的numberOfEmptySeats-1
      //若selectedSeats將已放入位置去除則讓bookingseat.jsx的numberOfEmptySeats +1
      if (prevState.selectedSeats.length < this.state.selectedSeats.length) {
        this.props.setNumberOfEmptySeats(this.props.numberOfEmptySeats - 1);
      } else {
        this.props.setNumberOfEmptySeats(this.props.numberOfEmptySeats + 1);
      }
    }
  }

  // 獲取座位狀態的函數
  getSeatStatus = (rowNumber, seatNumber) => {
    // 根據傳入的座位資訊this.props.seatinfo與參數的rowNumber, seatNumber比對符合的座位，並輸出第一筆符合的資料
    const seat = this.props.seatinfo.find(
      //seat不等於上面的const seat，它只是遍歷的元素
      (seat) => seat.rowNumber === rowNumber && seat.seatNumber === seatNumber
    );

    // 如果找到座位則返回其狀態，否則返回 "empty"
    return seat ? seat.seatStatus : "empty";
  };

  // 處理座位點擊事件
  selectSeat = (seat) => {
    const { rowNumber, seatNumber } = seat; //解構該位置的rowNumber和seatNumber
    const seatStatus = this.getSeatStatus(rowNumber, seatNumber); //獲取該座位狀態

    const { selectedSeats } = this.state; //已選座位陣列

    //如果點擊的座位在已選座位陣列裡面的話isSelected為true
    const isSelected = selectedSeats.some(
      (selectedSeat) =>
        selectedSeat.rowNumber === rowNumber &&
        selectedSeat.seatNumber === seatNumber
    );

    // 判斷已選擇座位數是否小於最大可選擇座位數
    if (selectedSeats.length < this.context.state.maxSelectedSeats) {
      if (seatStatus === "empty") {
        // 處理座位為空的點擊事件
        this.handleEmptySeatClick(isSelected, seat, rowNumber, seatNumber);
      } else if (seatStatus === "selected") {
        // 處理座位已選的點擊事件
        this.handleSelectedSeatClick(isSelected, seat, rowNumber, seatNumber);
      }
    } else {
      // 處理已達到最大選擇座位數的情況
      this.handleMaxSelectedSeats(isSelected, seat, rowNumber, seatNumber);
    }

    // console.log(this.state.selectedSeats);
  };

  // 處理座位為空的點擊事件
  handleEmptySeatClick = (isSelected, seat, rowNumber, seatNumber) => {
    const { selectedSeats } = this.state; //已選座位陣列

    // 如果點擊的座位在已選座位陣列之中(isSelected===true)，移除已選座位陣列中的該座位
    if (isSelected) {
      const updatedSelectedSeats = selectedSeats.filter(
        (selectedSeat) =>
          !(
            selectedSeat.rowNumber === rowNumber &&
            selectedSeat.seatNumber === seatNumber
          )
      );
      this.setState({ selectedSeats: updatedSelectedSeats });

      this.props.updateSeatStatus(rowNumber, seatNumber, "empty"); // 更新父層座位狀態為 "empty"
    } else {
      // 如果座位未選擇，添加該座位到已選擇陣列中，並更新座位狀態為 "selected"
      const selectedSeat = { ...seat, seatStatus: "selected" }; //建立一個變數selectedSeat存放原本rowNumber, seatNumber和seatStatus變為"selected"
      // console.log(this.state.selectedSeats);
      this.setState((prevState) => ({
        selectedSeats: [...prevState.selectedSeats, selectedSeat], //加入新建立的selectedSeat
      }));
      // console.log(this.state.selectedSeats);
      this.props.updateSeatStatus(rowNumber, seatNumber, "selected"); // 更新父層座位狀態為 "selected"
    }
  };

  // 處理座位已選的點擊事件
  handleSelectedSeatClick = (isSelected, seat, rowNumber, seatNumber) => {
    const { selectedSeats } = this.state;
    // 移除已选择的座位
    const updatedSelectedSeats = selectedSeats.filter(
      (selectedSeat) =>
        !(
          selectedSeat.rowNumber === rowNumber &&
          selectedSeat.seatNumber === seatNumber
        )
    );
    this.setState({ selectedSeats: updatedSelectedSeats });
    // 更新座位狀態為 "empty"
    this.props.updateSeatStatus(rowNumber, seatNumber, "empty");
  };

  // 處理達到最大選擇座位數的情况
  handleMaxSelectedSeats = (isSelected, seat, rowNumber, seatNumber) => {
    if (isSelected) {
      const { selectedSeats } = this.state;
      // 移除已選擇的座位
      const updatedSelectedSeats = selectedSeats.filter(
        (selectedSeat) =>
          !(
            selectedSeat.rowNumber === rowNumber &&
            selectedSeat.seatNumber === seatNumber
          )
      );
      this.setState({ selectedSeats: updatedSelectedSeats });
      // 更新座位狀態为 "empty"
      this.props.updateSeatStatus(rowNumber, seatNumber, "empty");
    } else {
      // 已選座位數量已達到最大限制的提示
      // alert("已選座位數量已達到最大限制");
      Swal.fire({
        title: "已選座位數量已達到最大限制",
        icon: "warning",
        confirmButtonText: "確定",
      });
      // console.log("已選座位數量已達到最大限制");
    }
  };

  // 渲染座位圖的函數
  renderSeatMap = () => {
    const seatsPerRow = 10; // 每行座位數
    const seatRows = Math.ceil(this.props.seatinfo.length / seatsPerRow); // 計算需要多少行

    const rows = []; // 存儲渲染的每一行座位
    for (let rowIndex = 0; rowIndex < seatRows; rowIndex++) {
      // 根據當前行號，slice得到屬於當前行的座位array
      const rowSeats = this.props.seatinfo.slice(
        rowIndex * seatsPerRow,
        (rowIndex + 1) * seatsPerRow
      );

      // 生成當前行的 JSX 元素
      const row = (
        <div key={rowIndex} className={styles.seatRow}>
          <div className={styles.rowLabel}>{rowIndex + 1}</div> {/* 顯示行號 */}
          {rowSeats.map((seat) => (
            <div
              key={`${seat.rowNumber}-${seat.seatNumber}`}
              className={`${styles.seat} ${
                styles[this.getSeatStatus(seat.rowNumber, seat.seatNumber)]
              } ${
                styles[
                  this.state.selectedSeats.some(
                    (selectedSeat) =>
                      selectedSeat.rowNumber === seat.rowNumber &&
                      selectedSeat.seatNumber === seat.seatNumber
                  )
                    ? "selected"
                    : ""
                ]
              }`}
              onClick={() => this.selectSeat(seat)} // 設置點擊事件處理函數
            ></div>
          ))}
        </div>
      );

      rows.push(row); // 将当前行添加到行数组中
    }

    return rows; // 返回存储了所有行的数组
  };

  // 渲染列標籤
  renderColumnLabels = () => {
    const seatsPerRow = 10; // 每排座位數
    const columnLabels = [];

    //總共11格，第0格沒數字
    for (let columnIndex = 0; columnIndex <= seatsPerRow; columnIndex++) {
      columnLabels.push(
        <div key={columnIndex} className={styles.columnLabel}>
          {columnIndex === 0 ? "" : columnIndex}
        </div>
      );
    }

    return columnLabels;
  };

  render() {
    return (
      <div className={styles.seatMap}>
        {this.renderSeatMap()} {/* 渲染座位圖 */}
        <div className={styles.columnLabels}>
          {/* <div className="column-label"></div> 空白占位 */}
          {this.renderColumnLabels()} {/* 渲染列標籤 */}
        </div>
      </div>
    );
  }
}

export default SeatSelectorClass;
