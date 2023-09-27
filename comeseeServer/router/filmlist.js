var express = require("express");
var db = require("../db");
var filmlist = express.Router();

// 首頁: 現正熱映 & 即將上映
// → movieID / imageUrl

// 列表頁: 現正熱映 & 即將上映
// → movieID / imageUrl / movieNameCN / movieNameEN

filmlist.get("/", function (req, res) {
    db.exec("SELECT * FROM movie", [], function (results, fields) {
        res.send(JSON.stringify(results));
    });
});

// 上映中 日期 < 今天
// 資料庫沒有 先寫假的 6~8月
// SELECT * FROM movie WHERE releaseDate <= CURDATE()
filmlist.get("/released", function (req, res) {
    db.exec("SELECT * FROM movie WHERE releaseDate BETWEEN '2023-08-15' AND '2023-09-10'", [], function (results, fields) {
        res.send(JSON.stringify(results));
    });
});

// 即將上映 日期 > 今天
// 資料庫沒有 先寫假的 8月~
// SELECT * FROM movie WHERE releaseDate > CURDATE()
filmlist.get("/comingsoon", function (req, res) {
    db.exec("SELECT * FROM movie WHERE releaseDate > '2023-09-10'", [], function (results, fields) {
        res.send(JSON.stringify(results));
    });
});

//這個路由匯出以後是app.js使用
module.exports = filmlist;