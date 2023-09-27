import React, { Component } from "react";
import nav from "../css/navbar.module.css";
import TicketContext from "../TicketContext";
import Swal from "sweetalert2";

class Navbar extends Component {
  static contextType = TicketContext;

  state = {
    isLoggedIn: false,
    // isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  };

  componentDidMount() {
    this.context.checkTokenExpiration(); //檢查令牌是否已經過期

    //檢查token是否從在於localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // 如果本地存储中存在令牌，则用户已登录
      this.setState({ isLoggedIn: true });
    }
  }

  handleLogout = () => {
    // 在注销时，从本地存储中移除令牌
    // localStorage.removeItem('token');
    this.context.logout();
    // 更新状态为未登录
    this.setState({ isLoggedIn: false });
  };

  render() {
    return (
      <nav className="navbar fixed-top">
        <div className={`container ${nav.nav}`}>
          <a href="/" className={nav.navLogo}>
            {""}
          </a>
          <span className={nav.navberA}>
            <a href="/">電影首頁</a>
            <a href="/Socialhome">社群討論</a>
            <a href="/Member">會員中心</a>
            {/* <a href="/login">登入</a> */}
            {this.state.isLoggedIn ? (
              // 如果已登入，則顯示注銷按钮
              //   <button onClick={this.handleLogout}>登出</button>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  this.handleLogout();
                  // alert("已登出");
                  // window.location.href = "/";
                  Swal.fire({
                    title: "已登出",
                    icon: "success",
                    confirmButtonText: "確定",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // 在確定按鈕被按下後執行刷新網頁的程式碼
                      window.location.href = "/";
                    }
                  });
                }}
              >
                登出
              </a>
            ) : (
              // 如果未登入，則顯示登入按钮
              <a href="/login">登入</a>
            )}
          </span>
        </div>
      </nav>
    );
  }
}

export default Navbar;
