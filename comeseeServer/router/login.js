const express = require("express");
const router = express.Router();
const db = require("../db"); // 引入 db.js 模組
const jwt = require("jsonwebtoken"); // 引入 jsonwebtoken 套件
const bcrypt = require("bcrypt"); // 引入 bcrypt 套件

// 密鑰，您應當保護好密鑰，不要硬編碼在程式中
const secretKey = "your-secret-key";

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 在此處使用 db.exec 函數執行 SQL 查詢以獲取用戶的密碼哈希
    const sql = "SELECT * FROM member WHERE email = ?";
    const data = [email];

    const results = await new Promise((resolve, reject) => {
      db.exec(sql, data, (results, fields) => {
        resolve(results);
      });
    });

    if (results.length === 1) {
      // 用户存在，检查密码
      const member = results[0];
      console.log(member);
      const hashedPassword = member.password; // 数据库中存储的密码哈希

      // 使用 bcrypt 的 compare 方法来验证密码
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        // 登录成功，创建 JWT
        const token = jwt.sign(
          { userId: member.userID, email: member.email },
          secretKey,
          { expiresIn: "10h" }
        );

        // 计算 10 秒后的 UNIX 时间戳
        const now = Date.now() / 1000; // 当前时间的 UNIX 时间戳（以秒为单位）
        const expiresIn = 36000; // 10 秒
        const exp = now + expiresIn; // 计算令牌过期时间的 UNIX 时间戳

        // 返回 JWT 和成功訊息
        res.json({
          success: true,
          message: "登录成功",
          token,
          exp: exp,
        });
      } else {
        // 登录失败，密码不匹配
        res
          .status(401)
          .json({ success: false, message: "无效的电子邮件或密码" });
      }
    } else {
      // 登录失败，用户不存在
      res.status(401).json({ success: false, message: "无效的电子邮件或密码" });
    }
  } catch (error) {
    console.error("登录时出现错误：", error);
    res.status(500).json({ success: false, error: "登录失败" });
  }
});

module.exports = router;
