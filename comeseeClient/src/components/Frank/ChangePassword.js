import React, { useState } from "react";
import axios from 'axios'; // 导入axios
import member from "../../css/Frank/changepassword.module.css";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [submitStatus, setSubmitStatus] = useState(""); // 用于存储提交状态的状态

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    }
  };


  const handleBlur = () => {
    // 添加密码验证逻辑
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)) {
      setPasswordError("請輸入英文大小寫與數字夾雜、六位數以上的密碼");
    } else {
      setPasswordError("");
    }

    // 检查再次确认密码是否与新密码相同
    if (confirmPassword !== password) {
      setConfirmPasswordError("密碼不一致");
    } else {
      setConfirmPasswordError("");
    }

    if (!/^\d{4}-\d{3}-\d{3}$/.test(phoneNumber)) {
      setPhoneNumberError("請輸入有效的手機號碼格式（例如：0987-654-321）");
    } else {
      setPhoneNumberError("");
    }
  };

  const handleSubmit = async () => {
    // 在提交按钮点击时发送请求
    try {
      // 构建请求体
      const data = {
        password,
        confirmPassword,
        phoneNumber
      };

      // 发送 POST 请求到后端
      const response = await axios.post('/api/change-password', data);

      // 根据后端响应更新状态
      if (response.data.success) {
        setSubmitStatus("認證成功");
      } else {
        setSubmitStatus("認證失敗");
      }
    } catch (error) {
      console.error("發生錯誤", error);
      setSubmitStatus("認證失敗");
    }
  };

  return (
    <div className={member.allinput}>
      <div className={member.FormGroup}>
        <div className={member.a1}>
          <label className={member.b1}>原密碼</label>
        </div>
        <input placeholder="Password"
          type="password"
          name="password"
          className={member.c1} />
      </div>
      <div className={member.FormGroup}>
        <div className={member.a2}>
          <label className={member.b1}>新密碼</label>
        </div>
        <input
          type="password"
          name="password"
          className={`${member.c1} ${passwordError && member.errorInput}`}
          value={password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Password"
        />
        {passwordError && (
          <div className={`${member.d2} ${member.errorMessage}`}>
            {passwordError}
          </div>
        )}
      </div>
      <div className={member.FormGroup}>
        <div className={member.a3}>
          <label className={member.b1}>再次確認密碼</label>
        </div>
        <input
          type="password"
          name="confirmPassword"
          className={`${member.c1} ${confirmPasswordError && member.errorInput
            }`}
          placeholder="Password"
          value={confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {confirmPasswordError && (
          <div className={`${member.d3} ${member.errorMessage}`}>
            {confirmPasswordError}
          </div>
        )}
      </div>
      <div className={member.FormGroup}>
        <div className={member.a4}>
          <label className={member.b1}>手機號碼</label>
        </div>
        <input
          type="text"
          name="phoneNumber"
          className={`${member.c1} ${phoneNumberError && member.errorInput}`}
          placeholder="PhoneNumber"
          value={phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {phoneNumberError && (
          <div className={`${member.d4} ${member.errorMessage}`}>
            {phoneNumberError}
          </div>
        )}
      </div>

      <div className={member.ButtonGroup}>
        <button type="submit" className={member.ConfirmButton} >
        {submitStatus ? submitStatus : "尚未確認"}
        </button>
      </div>
      <div className={member.FormGroup}>
        <div className={member.a5}>
          <label className={member.b1}>第三方登入綁定</label>
        </div>
        <div className={member.social}>
          <div className={member.GOOGLE1}>
            <button type="submit" className={member.GOOGLE}>
              GOOGLE
            </button>
            <button type="submit" className={member.MYGOOGLE}>
              未綁定
            </button>
          </div>
          <div className={member.FACEBOOK1}>
            <button type="submit" className={member.FACEBOOK}>
              FACEBOOK
            </button>
            <button type="submit" className={member.MYFACEBOOK}>
              未綁定
            </button>
          </div>
          <div className={member.LINE1}>
            <button type="submit" className={member.LINE}>
              LINE
            </button>
            <button type="submit" className={member.MYLINE}>
              未綁定
            </button>
          </div>
        </div>
        <div className={member.end}>
          <button type="submit" className={member.good} onClick={handleSubmit}>
            送出
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
