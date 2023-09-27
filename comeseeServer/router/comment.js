var express = require("express");
var db = require("../db");
var comment = express.Router();

//取得movieID, userID, sendTime, comment, score
comment.get("/", function (req, res) {
    db.exec("SELECT movieID, userID, sendTime, comment, score FROM commentlist", [], function (results, fields) {
        res.send(JSON.stringify(results));
    });
});

comment.get("/members", function (req, res) {
    db.exec("SELECT UserID, userName, image FROM member", [], function (results, fields) {
        res.send(JSON.stringify(results));
    });
});

comment.post("/", function (req, res) {
    const { movieID, comment, score, userID } = req.body;
    const sendTime = new Date(); // 获取当前时间
    // const userID = req.user ? req.user.userID : null;


    db.exec(
        "INSERT INTO commentlist (movieID, userID, sendTime, comment, score) VALUES (?, ?, ?, ?, ?)",
        [movieID, userID, sendTime, comment, score],
        function (results, fields) {
            res.status(201).json({ message: "Comment submitted successfully" });
        }
    );
});



//這個路由匯出以後是app.js使用
module.exports = comment;
