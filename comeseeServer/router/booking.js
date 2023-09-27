var express = require("express");
var db = require("../db");
var booking = express.Router();

//以showtimeID取得訂票頁面所需的資訊(movieNameCN, movieNameEN, rank, releaseDate, movieLength, movieType, director, actor, cinemaName, CONCAT(theaterName, '(', version, ')') AS theater, date, startTime)
booking.get("/info/:showtimeID([0-9]+)", function (req, res) {
  let showtimeID = req.params.showtimeID;
  db.exec(
    "SELECT movieNameCN, movieNameEN, rank, releaseDate, movieLength, movieType, director, actor, cinemaName, CONCAT(theaterName, '(', version, ')') AS theater, date, startTime, imageUrl, movieID  FROM ((showtime AS st LEFT JOIN movie AS m ON st.movieID = m.id) LEFT JOIN theater AS t ON st.theaterID = t.theaterID) LEFT JOIN cinema as c ON t.cinemaID = c.cinemaID WHERE showtimeID = ?",
    [showtimeID],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});

//這個路由匯出以後是app.js使用
module.exports = booking;
