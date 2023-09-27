import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // 引入 Axios
import frank from "../../css/Frank/forgot-password.module.css";

class ForgotPasswordPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '', // 用于存储用户输入的电子邮件地址
      message: '', // 用于存储从后端接收的响应消息
    };
  }

  // 处理电子邮件输入框变化
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  // 处理密码重置请求
  handleResetPassword = () => {
    const { email } = this.state;

    // 发送POST请求到后端
    axios.post('http://localhost:2407/forgotpassword', { email })
      .then((response) => {
        // 处理成功响应
        this.setState({ message: response.data.message });
      })
      .catch((error) => {
        // 处理请求错误
        this.setState({ message: '請輸入正確的電子郵件地址' });
      });
  }

  render() {
    const { message } = this.state;

    return (
      <div className={frank.top}>
        <div className={`container ${frank.ForgotPasswordContainer} `}>
          <div>
            <h1 className={frank.ForgotPasswordHeading}>忘記密碼</h1>
          </div>
          <p className={frank.tit}>請輸入您的電子郵件地址以重置密碼：</p>
          <input type="email" placeholder="輸入您的電子郵件地址" className={frank.myinput} onChange={this.handleEmailChange} />
          <p className={frank.mes}>{message}</p>
          <button className={frank.ResetButton} onClick={this.handleResetPassword}>送出
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={frank.BackToLogin}>
            <Link className={frank.myBackToLogin} to="/login">返回登入頁面</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPasswordPage;
