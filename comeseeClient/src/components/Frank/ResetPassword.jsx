import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // 引入 Axios 库
import frank from "../../css/Frank/forgot-password.module.css";

function ResetPassword() {
  // 使用 React Router 的 useLocation 钩子来获取当前页面的 URL
  const location = useLocation();

  // 使用 URLSearchParams 从 URL 查询参数中提取重置令牌
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get('token');

  // 使用 ref 来存储 resetToken 的值
  const resetTokenRef = useRef(resetToken);

  // 创建状态变量，用于存储用户输入的新密码、确认密码以及后端返回的消息
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true); // 用于检查密码匹配的状态

  // 在 useEffect 钩子中，可以执行一些副作用操作，例如验证重置令牌的有效性
  useEffect(() => {
    // 获取完整的 pathname
    const path = location.pathname;

    // 使用 '/' 进行分割
    const parts = path.split('/');

    // 确保 parts 数组包含足够的元素，并且重置令牌的位置是正确的
    if (parts.length >= 3) {
      const resetToken = parts[2]; // 第三个部分包含重置令牌

      resetTokenRef.current = resetToken;

      console.log('resetToken:', resetToken);

      // 这里可以添加验证重置令牌的逻辑，根据需要执行重定向或错误处理
    } else {
      // 如果 parts 数组不包含足够的元素，可以执行错误处理
      console.error('無效的重置令牌');
      // 这里可以根据需要执行重定向或错误处理
    }
  }, [location.pathname]);

  // 處理使用者輸入新密碼的函數
  const handleNewPasswordChange = (event) => {
    const newPasswordValue = event.target.value;
    setNewPassword(newPasswordValue);
    console.log('新密碼:', newPasswordValue);
  }

  // 處理使用者輸入確認密碼的函數
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    // 检查密码是否匹配并更新密码匹配状态
    setPasswordMatch(event.target.value === newPassword);
  }

  // 處理重置密碼操作的函數
  const handleResetPassword = () => {
    console.log('handleResetPassword 函數被呼叫');

    const currentResetToken = resetTokenRef.current;

    // 首先，檢查新密碼和確認密碼是否匹配
    if (newPassword !== confirmPassword) {
      setMessage('新密碼和確認密碼不匹配');
      return; // 不繼續執行後續代碼
    }

    // 在這裡添加 console.log 來輸出重置令牌和新密碼
    console.log('發送以下數據到伺服器:');
    console.log('重置令牌:', currentResetToken); // 確保 resetToken 的值是正確的
    console.log('新密碼:', newPassword);

    // 發送 POST 請求到後端，包括重置令牌和新密碼
    axios.post('http://localhost:2407/ResetPassword', { token: currentResetToken, newPassword })
      .then((response) => {
        // 處理成功響應，將響應消息存儲在 message 狀態變量中
        setMessage(response.data.message);
      })
      .catch((error) => {
        // 處理請求錯誤，設置一個通用的錯誤消息
        setMessage('密碼變更失敗');
      });

    // 清空輸入字段
    setNewPassword('');
    setConfirmPassword('');
  }

  // 渲染頁面，包括輸入新密碼、確認密碼以及重置密碼按鈕
  return (
    <div className={frank.top}>
      <div className={`container ${frank.ForgotPasswordContainer} `}>
        <div className={frank.tit}>
          <h1 className={frank.ForgotPasswordHeading}>變更密碼</h1>
        </div>
        <p className={frank.tit}>請輸入您的新密碼：</p>
        <input type="text" placeholder="輸入您的新密碼" className={frank.myinput} onChange={handleNewPasswordChange} />
        <input type="password" placeholder="再次輸入您的新密碼" className={frank.myinput} onChange={handleConfirmPasswordChange} />
        <p className={frank.mes}>{message}</p>
        {/* 显示密码匹配消息 */}
        {passwordMatch ? null : <p className={frank.mes}>新密碼和確認密碼不相同</p>}
        <button className={frank.ResetButton} onClick={handleResetPassword}>重置密碼
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;