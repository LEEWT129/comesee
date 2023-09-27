var express = require("express");
var db = require("../db");
var filminfo = express.Router();

// 取得指定電影的相關資訊
filminfo.get("/:id", function (req, res) {
    let id = req.params.id;
    db.exec(
        "SELECT * FROM `movie` WHERE id=?",
        [id],
        function (results, fields) {
            res.send(JSON.stringify(results));
        }
    );
});

// 取得該電影全部場次
filminfo.get("/order/:id", function (req, res) {
    let movieID = req.params.id;
    db.exec("SELECT * FROM `showtime` WHERE movieID=?",
        [movieID], function (results, fields) {
            res.send(JSON.stringify(results));
        });
});

// 指定電影id 搜尋該電影場次日期
filminfo.get("/getdate/:movieID", function (req, res) {
    let movieID = req.params.movieID;
    db.exec("SELECT DISTINCT DATE_FORMAT(date, '%Y-%m-%d') AS showtimeDate FROM `showtime` WHERE movieID = ?",
        [movieID],
        function (results, fields) {
            res.send(JSON.stringify(results));
        });
});

// 透過日期搜尋 該電影有上映的影城
filminfo.post("/getcinema", function (req, res) {
    let movieID = req.body.movieID;
    let date = req.body.date;
    db.exec("SELECT DISTINCT cinemaName,c.cinemaID FROM `showtime` AS s LEFT JOIN `cinema` AS c ON s.cinemaID= c.cinemaID WHERE movieID=? AND date=? ",
        [movieID, date],
        function (results, fields) {
            res.send(JSON.stringify(results));
        });
});

// 場次版本
filminfo.post("/getversion", function (req, res) {
    let movieID = req.body.movieID;
    let cinemaID = req.body.cinemaID;
    let date = req.body.date;
    db.exec("SELECT DISTINCT version, t.theaterID FROM (SELECT * FROM `showtime` WHERE movieID=?) AS s LEFT JOIN `theater` AS t ON s.theaterID = t.theaterID WHERE s.cinemaID=? AND date = ? ORDER BY 2",
        [movieID, cinemaID, date],
        function (results, fields) {
            res.send(JSON.stringify(results));
        });
});

// 該場次時間
filminfo.post("/getshowtime", function (req, res) {
    let movieID = req.body.movieID;
    let theaterID = req.body.theaterID;
    let date = req.body.date;
    db.exec("SELECT showtimeID, startTime FROM `showtime` WHERE movieID=? AND theaterID=? AND date=? ORDER BY 2;",
        [movieID, theaterID, date],
        function (results, fields) {
            res.send(JSON.stringify(results));
        });
});

// 場次ID 顯示詳細資料
filminfo.get("/getcheck/:showtimeID", function (req, res) {
    let showtimeID = req.params.showtimeID;
    db.exec("SELECT * FROM showtime AS s INNER JOIN cinema AS c ON s.cinemaID = c.cinemaID INNER JOIN movie AS m ON s.movieID = m.id INNER JOIN theater AS t ON s.theaterID = t.theaterID WHERE showtimeID = ?",
        [showtimeID],
        function (results, fields) {
            res.send(JSON.stringify(results));
        });
});

// 分數
filminfo.get("/averageScore/:movieID", function (req, res) {
    let movieID = req.params.movieID;
    db.exec(
        "SELECT AVG(score) AS averageScore FROM commentlist WHERE movieID = ?",
        [movieID],
        function (results, fields) {
            res.send(JSON.stringify(results[0]));
        }
    );
});

filminfo.get("/trailer/:id", function (req, res) {
    let id = req.params.id; // 获取电影的ID参数
    db.exec("SELECT trailerURL FROM movie WHERE id = ?",
        [id],
        function (results, fields) {
            if (results.length > 0) {
                const trailerURL = results[0].trailerURL;
                res.send({ trailerURL });
            } else {
                res.status(404).send({ message: "电影未找到" });
            }
        }
    );
});


//這個路由匯出以後是app.js使用
module.exports = filminfo;