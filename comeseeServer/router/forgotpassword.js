const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('../db'); // 导入数据库模块

router.post('/', async (req, res) => {
  const { email } = req.body;

  // 生成重设令牌
  const resetToken = crypto.randomBytes(20).toString('hex');

  try {
    // 更新用户帐户中的重设令牌
    const result = await new Promise((resolve) => {
      db.exec('UPDATE member SET reset_token = ? WHERE email = ?', [resetToken, email], (results, fields) => {
        if (results && results.length > 0) {
          resolve(results);
        } else {
          resolve(null);
        }
      });
    });

    // 配置邮件传输器
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'vbn698754@gmail.com', // 发送邮件的电子邮件地址
        pass: 'yhdzxufccjuvwmdz', // 发送邮件的电子邮件密码或授权码
      },
    });

    const mailOptions = {
      from: 'vbn698754@gmail.com',
      to: email,
      subject: '重設密碼',
      text: `請點擊以下鏈接重設您的密碼：\n\nhttp://localhost:3000/ResetPassword/${resetToken}/\n\n如果您沒有請求重設密碼，請忽略此郵件。`,
    };

    // 发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("發送郵件時出錯：", error);
        res.status(500).json({ success: false, error: '發送郵件失敗' });
      } else {
        console.log("更改郵件已發送：", info.response);
        console.log('郵件已寄出:', result); // 这里改为使用 result
        res.status(201).json({ success: true, message: "郵件已寄出成功" });
      }
    });
  } catch (error) {
    console.error("更改時出現錯誤：", error);
    res.status(506).json({ success: false, error: "更改失敗" });
  }
});

module.exports = router;
