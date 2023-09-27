import React, { Component } from "react";
import TicketContext from "./TicketContext";
import jwtDecode from "jwt-decode";

export class TicketProvider extends Component {
  constructor(props) {
    super(props);
    const savedState =
      JSON.parse(localStorage.getItem("ticketContextState")) || {};
    // 要共享的 state
    this.state = {
      ...savedState,

      userID: null,

      // 訂票資訊
      adultTickets: 0,
      studentTickets: 0,
      popcornL: 0,
      popcornS: 0,
      colaL: 0,
      colaS: 0,
      canProceed: false,


      activeRow1: null,
      ticketName: ["全票", "學生票"],
      ticketNum: ["1", "1"],
      ticketMoney: ["350", "300"],
      //maxSelectedSeats由選則人數(首頁開始)頁面更新，預設應為0
      maxSelectedSeats: 0,
      seatNumber: "",
      foodName: ["爆米花(大)", "爆米花(小)", "可樂(大)", "可樂(小)"],
      foodNum: ["1", "1", "1", "1"],
      foodMoney: ["120", "80", "50", "35"],

      // 紅利點數
      discount: 0,
      usePoint: 0,

      // 優惠券
      couponID: [],
      selectedCoupon: "", //預設
      coupons: [
        {
          couponID: "入會禮 - 贈送爆米花一份",
          discountAmount: 50, // 一般金額的折扣
          type: "fixed", // 一般金額的折扣類型
        },
        {
          couponID: "里程碑活動 - 95折優惠卷使用",
          discountPercentage: 5, // 百分比的折扣
          type: "percentage", // 百分比的折扣類型
        },
        {
          couponID: "里程碑活動 - 88折優惠卷使用",
          discountPercentage: 12, // 百分比的折扣
          type: "percentage", // 百分比的折扣類型
        },
        {
          couponID: "里程碑活動 - 優惠電影卷乙張",
          discountAmount: 350, // 百分比的折扣
          type: "fixed", // 百分比的折扣類型
        },
      ],
      couponDiscount: 0, //預設

      // 折扣加總
      allDiscount: 0,

      // TicketType小計、discount金額
      subtotal: 0,

      //discount小計、confirm總計
      total: 0,

      // 訂票系統(品)選擇時間時會有對應的showtimeID
      showtimeID: null,

      //----------------------------------------------------------------------

      //浩維選位頁面需要
      //選擇座位頁面以選擇的座位，訂單頁面需要從selectedSeats拿取選到的位置
      selectedSeats: [],

      //若選擇的座位等於maxSelectedSeats則seatflag = true
      seatflag: false,

      //----------------------------------------------------------------------

      //訂票資訊
      bookingInfo: [],

      //----------------------------------------------------------------------
      //JWT相關
      //從localstorage獲取令牌和過期时间
      token: localStorage.getItem("token") || null,
      exp: localStorage.getItem("exp") || null,
    };

    this.setStateValue = this.setStateValue.bind(this);
    this.setDiscount = this.setDiscount.bind(this);
    this.setSelectedCoupon = this.setSelectedCoupon.bind(this);
    this.setSubtotal = this.setSubtotal.bind(this);
  }

  //JWT相關函式以下
  componentDidMount() {
    //解碼JWT token 取出 userID 放入 state
    this.decodedTokenGetUserID();
  }

  //解碼JWT token 取出 userID 放入 state
  decodedTokenGetUserID = () => {
    let token = localStorage.getItem("token") || null;
    // console.log(token);
    if (token) {
      const decodedToken = jwtDecode(token); // decodeJWT
      // console.log(decodedToken.userId);
      this.setState({ userID: decodedToken.userId });
    }
  };

  // 檢查令牌是否過期
  checkTokenExpiration = () => {
    if (this.state.exp) {
      // console.log("1111");
      const now = Date.now() / 1000;
      if (now > this.state.exp) {
        // 令牌已過期
        console.log("2222");
        this.setState({ token: null, exp: null });
        localStorage.removeItem("token");
        localStorage.removeItem("exp");
      }
    }
  };

  // 登入時將token, exp放入localStorage，context也更新
  login = (token, exp) => {
    this.setState({ token, exp });
    localStorage.setItem("token", token);
    localStorage.setItem("exp", exp);
  };

  //登出時將token, exp從localStorage移除，context也更新
  logout = () => {
    this.setState({ token: null, exp: null });
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
  };
  //JWT相關函式以上

  componentDidUpdate() {
    // 更新後，將state保存在本地端
    localStorage.setItem("ticketContextState", JSON.stringify(this.state));
  }

  setStateValue = (newState) => {
    
    // 狀態如果是 selectedSeats
    if ("selectedSeats" in newState) {
      const { selectedSeats } = newState;
      const seatNumbers = selectedSeats.map((seat) => {
        return `${seat.rowNumber}排${seat.seatNumber}位`;
      });
      // selectedSeats 輸出的格式放入seatNumber
      newState.seatNumber = seatNumbers.join(", ");
    }

    this.setState(newState);
    // console.log(this.state.bookingInfo)
  };

  // 紅利點數
  setDiscount = (discount) => {
    this.setState({ discount }, () => {
      this.updateAllDiscount();
    });
    // console.log(discount);
  };

  // 優惠券
  setSelectedCoupon = (selectedCoupon) => {
    const { subtotal } = this.state;
    var couponDiscount = 0;

    if (selectedCoupon) {
      // 根據選擇的優惠券類型計算折扣金額
      const selectedCouponData = this.state.coupons.find(
        (coupon) => coupon.couponID === selectedCoupon
      );

      if (selectedCouponData) {
        if (selectedCouponData.type === "fixed") {
          // 一般金額的折扣
          couponDiscount = selectedCouponData.discountAmount;
        } else if (selectedCouponData.type === "percentage") {
          // 百分比的折扣
          couponDiscount = Math.round(
            (selectedCouponData.discountPercentage / 100) * subtotal
          );
        }
      }
    }

    this.setState({ selectedCoupon, couponDiscount }, () => {
      this.updateAllDiscount();
    });
  };

  // 優惠總額
  updateAllDiscount = () => {
    const { discount, couponDiscount } = this.state;
    const newAllDiscount = discount + couponDiscount;
    this.setState({ allDiscount: newAllDiscount }, () => {
      console.log(this.state.allDiscount);
    });
  };

  //小計
  setSubtotal(subtotal) {
    this.setState({ subtotal });
  }

  //總計
  setTotal(total) {
    this.setState({ total });
  }

  render() {
    return (
      <TicketContext.Provider
        value={{
          state: this.state,
          setState: this.setStateValue,
          setDiscount: this.setDiscount,
          setSelectedCoupon: this.setSelectedCoupon,
          setSubtotal: this.setSubtotal,
          setTotal: this.setTotal,
          checkTokenExpiration: this.checkTokenExpiration,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </TicketContext.Provider>
    );
  }
}