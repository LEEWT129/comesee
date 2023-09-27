var express = require("express");
var db = require("../db");
var bonus = express.Router();


// 確認可以取得資料=>紅利點數
bonus.get("/:userID([0-9]+)", function (req, res) {
  db.exec(
    "SELECT SUM(point) - SUM(used) AS myPoint FROM bonus WHERE userID = ?",
    [req.params.userID],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});

bonus.post("/create", function (req, res) {
  const { userID, point, used } = req.body;
  console.log(req.body);
  // 新增到資料庫
  db.exec(
    "INSERT INTO bonus (userID, point, used) VALUES (?,?,?)",
    [userID, point, used],
    function (results, fields) {
      if (results) {
        return res.send("successfully : " + JSON.stringify(results));
      } else {
        return res.send("insertError");
      }
    }
  );
});

//會員中心=>紅利紀錄
bonus.get("/bonusrecord/:userID([0-9]+)", (req, res) => {
db.exec(
  "SELECT  used , DATE_FORMAT(ordertime, '%Y-%m-%d') AS bonusDate FROM bonus  WHERE userID = ?",
  [req.params.userID],
  function (results, fields) {
    res.send(JSON.stringify(results));
  }
);
});



// //匯出給是app.js使用
module.exports = bonus;