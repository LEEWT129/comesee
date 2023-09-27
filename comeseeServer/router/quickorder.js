var express = require("express");
var db = require("../db");
var quickorder = express.Router();

// 取得影城
quickorder.get("/", function (req, res) {
  db.exec("SELECT * FROM cinema", [], function (results, fields) {
    res.send(JSON.stringify(results));
  });
});

// 取得影片 v1
// quickorder.get("/movielist/:cinemaID", function (req, res) {
//     let cinemaID = req.params.cinemaID
//     db.exec("SELECT DISTINCT CONCAT(movieNameCN, '(', version, ')') AS movieName, movieID  FROM (SELECT movieID, movieNameCN, theaterID FROM showTime AS s LEFT JOIN movie AS m ON s.movieID = m.id WHERE cinemaID = ?) AS aa LEFT JOIN theater AS t ON aa.theaterID = t.theaterID;", [cinemaID], function (results, fields) {
//         res.send(JSON.stringify(results));
//     });
// });

// 取得影片 v2
quickorder.get("/movielist/:cinemaID", function (req, res) {
  let cinemaID = req.params.cinemaID;
  db.exec(
    "SELECT DISTINCT CONCAT(movieNameCN, '(', version, ')') AS movieName, movieID, t.theaterID  FROM (SELECT movieID, movieNameCN, theaterID FROM showTime AS s LEFT JOIN movie AS m ON s.movieID = m.id WHERE cinemaID = ?) AS aa LEFT JOIN theater AS t ON aa.theaterID = t.theaterID;",
    [cinemaID],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});

// 取得日期
quickorder.post("/getDate", function (req, res) {
  let movieID = req.body.movieID;
  let cinemaID = req.body.cinemaID;
  let theaterID = req.body.theaterID;
  db.exec(
    "SELECT DISTINCT date FROM(SELECT date FROM showtime WHERE movieID = ? AND cinemaID = ? AND theaterID =?) as aa",
    [movieID, cinemaID, theaterID],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});

// 取得場次時間
quickorder.post("/getStartTime", function (req, res) {
  let movieID = req.body.movieID;
  let cinemaID = req.body.cinemaID;
  let date = req.body.date;
  db.exec(
    "SELECT startTime FROM showtime WHERE movieID = ? AND cinemaID = ? AND DATE(date) = ?",
    [movieID, cinemaID, date],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});

// 取得showtimeID
quickorder.post("/getShowtimeID", (req, res) => {
  const { cinemaID,movieID, theaterID,startTime, date } = req.body;

  db.exec(
    "SELECT showtimeID FROM showtime WHERE movieID=? AND cinemaID=? AND theaterID=? AND startTime=? AND date=?",
    [movieID,cinemaID, theaterID,startTime, date],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});

// 取得剩餘座位資訊
quickorder.get("/emptySeat/:showtimeID", (req, res) => {
  const showtimeID = req.params.showtimeID;

  db.exec(
    "SELECT COUNT(*) AS emptySeat FROM seatinfo WHERE showtimeID = ? AND seatStatus = 'empty'",
    [showtimeID],
    function (results, fields) {
      const emptySeat = results[0].emptySeat;
      res.send({ emptySeat });
    }
  );
});

//這個路由匯出以後是app.js使用
module.exports = quickorder;
