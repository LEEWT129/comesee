const express = require("express");
const router = express.Router();
const db = require("../db"); // 导入数据库连接模块
const bcrypt = require("bcrypt"); // 用于密码加密
const saltRounds = 10; // 加密强度，可以根据需要调整
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const ejs = require("ejs");

// 注册路由
router.post(
  "/",
  [
    // 使用 express-validator 进行请求参数验证
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("username").isLength({ min: 1 }),
    body("phonenumber").matches(/^\d{4}\d{3}\d{3}$/),
  ],
  async (req, res) => {
    // 检查验证结果
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    // 从请求中获取用户信息，包括电影喜好
    const {
      email,
      password,
      username,
      gender,
      birthday,
      phonenumber,
      addressCity,
      addressTown,
      addressDetail,
      moviePreferences,
    } = req.body;

    // 确保 moviePreferences 是一个数组，然后将其转换为字符串
    const moviePreferencesString = Array.isArray(moviePreferences)
      ? moviePreferences.join(",")
      : "";

    try {
      // 检查用户是否已经存在
      const result = await new Promise((resolve, reject) => {
        db.exec(
          "SELECT * FROM member WHERE email = ?",
          [email],
          (results, fields) => {
            if (results && results.length > 0) {
              resolve(results);
            } else {
              resolve(null);
            }
          }
        );
      });

      if (result && result.length > 0) {
        return res.status(420).json({ error: "用户已存在" });
      }

      // 使用 bcrypt 加密用户密码
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const reset_token = null;
      const selfintro = null;
      const image = 'defaultimg.png';

      // 将用户信息插入数据库，包括 moviePreferences
      db.exec(
        "INSERT INTO member (email, password, username, gender, birthday, phonenumber, addressCity, addressTown, addressDetail, moviePreferences, selfintro, reset_token, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          email,
          hashedPassword,
          username,
          gender,
          birthday,
          phonenumber,
          addressCity,
          addressTown,
          addressDetail,
          moviePreferencesString,
          selfintro,
          reset_token,
          image,
        ],
        (results, fields) => {
          if (results && results.insertId) {
            // 注册成功

            // 渲染 EJS 模板
            ejs.renderFile(
              "views/registration_success.ejs",
              { username, email },
              (err, data) => {
                if (err) {
                  console.error("渲染模板时出错：", err);
                  return res
                    .status(500)
                    .json({ success: false, error: "发送邮件失败" });
                }

                // 发送注册成功邮件
                const transporter = nodemailer.createTransport({
                  // 配置您的邮件服务提供商信息
                  service: "Gmail",
                  auth: {
                    user: "vbn698754@gmail.com", // 发送邮件的邮箱地址
                    pass: "yhdzxufccjuvwmdz", // 发送邮件的邮箱密码或授权码
                  },
                });

                const mailOptions = {
                  from: "vbn698754@gmail.com",
                  to: email,
                  subject: "註冊成功通知",
                  html: data, // 使用渲染后的 HTML 作为邮件正文
                };

                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.error("发送邮件时出错：", error);
                  } else {
                    console.log("注册成功邮件已发送：", info.response);
                  }
                });

                // 发送邮件结束
                console.log("註冊成功:", results);
                res.status(201).json({ success: true, message: "註冊成功" });
              }
            );
          }
        }
      );
    } catch (error) {
      console.error("註冊時出現錯誤：", error);
      res.status(506).json({ success: false, error: "註冊失敗" });
    }
  }
);

module.exports = router;
