import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom.min";

import TicketContext from "../../TicketContext";

import SB from "../../css/payment/SwitchBtn.module.css";
import Swal from "sweetalert2";

class SwitchBtn extends Component {
  static contextType = TicketContext;

  goToNextPage = () => {
    this.props.history.push(this.props.next);
    window.scrollTo(0, 0);
  };

  render() {
    var seatflag = this.props.seatflag; //傳入的seatflag判斷是否有超過最大選擇座位
    return (
      <div className={SB.switchBtn}>
        <Link
          to="#" // 將 "#" 用作連結的 placeholder，因為上一頁不需要指定路由
          onClick={() => this.props.history.goBack()} // 返回上一頁
          className={SB.btnL}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L6.707 8l4.647 4.646a.5.5 0 1 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708 0z"
            />
          </svg>
          <span>上一頁</span>
        </Link>
        <Link
          to="#"
          className={SB.btnR}
          onClick={(e) => {
            if (!seatflag) {
              e.preventDefault();
              Swal.fire({
                title: `請選擇 ${this.context.state.maxSelectedSeats} 個座位`,
                icon: "warning",
                confirmButtonText: "確定",
              });
            } else {
              this.goToNextPage();
            }
          }}
        >
          <span>下一頁</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            fill="currentColor"
            className="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </Link>
      </div>
    );
  }
}

export default withRouter(SwitchBtn);
