const express = require('express');
const router = express.Router();
const db = require('../db'); // 匯入您的資料庫模組
const bcrypt = require('bcrypt');
const saltRounds = 10; // 加密強度，可以根據需要調整

// 包裝資料庫查詢操作為 Promise
router.post('/', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // 添加以下兩行以查看前端發送的重設令牌和新密碼
        console.log('從前端接收到的令牌:', token);
        console.log('從前端接收到的新密碼:', newPassword);

        // 查詢資料庫以驗證重設令牌的有效性
        const queryResult = await new Promise((resolve, reject) => {
            db.exec('SELECT * FROM member WHERE reset_token = ?', [token], (results, fields) => {
                if (results && results.length > 0) {
                    resolve(results);
                } else {
                    reject(new Error('未找到匹配的重設令牌或令牌無效'));
                }
            });
        });

        // 添加日誌記錄驗證成功的信息
        console.log('令牌驗證成功');

        // 生成哈希密碼或其他安全處理方式，這裡使用 bcrypt 生成哈希密碼
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // 更新使用者密碼
        await new Promise((resolve, reject) => {
            db.exec('UPDATE member SET password = ?, reset_token = NULL WHERE reset_token = ?', [hashedPassword, token], (results, fields) => {
                if (results) {
                    resolve();
                } else {
                    reject(new Error('密碼更新失敗'));
                }
            });
        });

        // 密碼已成功更新，同時重設令牌已清空
        res.status(200).json({ success: true, message: '密碼已成功更新請點擊登入', clearFields: true });
    } catch (error) {
        console.error('重設密碼時出錯：', error);
        res.status(500).json({ success: false, message: '密碼重設失敗' });
    }
});

module.exports = router;
