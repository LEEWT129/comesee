import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // 導入axios
import LoginStyle from "../../css/Frank/loginPage.module.css";
import Gicon from "../../css/Frank/img/google.png";
import Ficon from "../../css/Frank/img/facebook.png";
import Licon from "../../css/Frank/img/line.png";
import TicketContext from "../../TicketContext";

class Login extends Component {
  static contextType = TicketContext;

  state = {
    email: "",
    password: "",
    showPassword: false,
    loginError: "", // 新增登入錯誤訊息狀態
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, loginError: "" }); // 清除之前的錯誤訊息
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      // 發送登錄請求到後端
      const response = await axios.post("http://localhost:2407/login", {
        email,
        password,
      });

      // 根據後端返回的數據處理登錄結果
      if (response.data.success) {
        // 登錄成功，儲存令牌並導航到其他頁面
        const token = response.data.token; // 從後端返回的JWT
        const exp = response.data.exp; //過期時間
        // localStorage.setItem("token", token); // 將令牌存儲在LocalStorage中
        // localStorage.setItem("exp", exp); // 將過期時間存儲在LocalStorage中

        // this.context.setState({ isLoggedIn: true });
        this.context.login(token, exp);

        // 打印令牌到控制台
        console.log("令牌：", token);

        // 將令牌添加到axios的默認請求標頭中
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // 可以使用react-router-dom中的history進行導航
        this.props.history.push("/"); // 將 '/dashboard' 替換成您希望導航的路由
        window.location.reload();
      }
    } catch (error) {
      this.setState({ loginError: "登錄失敗，請檢查您的郵件地址和密碼。" });
      console.error("發生錯誤", error);
    }
  };

  render() {
    return (
      <div className={LoginStyle.Login}>
        <div className={`${LoginStyle.bg} container`}>
          <h2 className={LoginStyle.title}>會員登入</h2>
          <form className={LoginStyle.formBox} onSubmit={this.handleSubmit}>
            <div className={LoginStyle.text}>電子郵件</div>
            <input
              type="email"
              className={LoginStyle.in}
              placeholder="User Name"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <div className={LoginStyle.text}>密　　碼</div>
            <input
              type={this.state.showPassword ? "text" : "password"}
              className={LoginStyle.in}
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            {this.state.loginError && (
              <div className={LoginStyle.error}>{this.state.loginError}</div>
            )}
            <div>
              <Link to="/ForgotPassword" className={LoginStyle.fp}>
                忘記密碼？
              </Link>
            </div>
            <button type="submit" className={LoginStyle.sbtn}>
              登入
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </form>
          <div className={LoginStyle.box}>
            <div className={LoginStyle.subtitle}>使用第三方登入</div>
            <div className={LoginStyle.tw}>
              <button className={LoginStyle.Lbtn}>
                <img src={Gicon} className={LoginStyle.icon} alt="google" />
                GOOGLE
              </button>
              <button className={LoginStyle.Lbtn}>
                <img src={Ficon} className={LoginStyle.icon} alt="facebook" />
                FACEBOOK
              </button>
              <button className={LoginStyle.Lbtn}>
                <img src={Licon} className={LoginStyle.icon} alt="line" />
                LINE
              </button>
            </div>
            <div className={LoginStyle.tip}>
              還沒加入會員嗎？
              <Link to="/Register" className={LoginStyle.gr}>
                請點此註冊
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
