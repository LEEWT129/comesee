var express = require("express");
var db = require("../db");
var coupon = express.Router();


//會員中心撈資料的路由
coupon.post("/", function (req, res) {
    const body = req.body;
    const userID = body.userID
    const data = [body.couponID, userID, body.money, body.status];
  
    db.exec(
      "insert into coupon (couponID, userID, money, status) values (?, ?, ?, ?)",
      data,
      function (results, fields) {
        res.send(JSON.stringify(results));
      }
    );
  });

  coupon.get("/couponStatus/:userID([0-9]+)", function (req, res) {
    db.exec(
      "SELECT status FROM coupon WHERE userID = ? ",
      [req.params.userID],
      function (results, fields) {
        res.send(JSON.stringify(results));
      }
    );
  });



// 確認可以取得資料
coupon.get("/:userID([0-9]+)", function (req, res) {
  db.exec(
    "SELECT * FROM coupon WHERE userID = ? AND status = 1",
    [req.params.userID],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});




coupon.put("/update", function (req, res) {
  const{userID, couponID} = req.body;

  db.exec(
    "UPDATE coupon SET status = 2 WHERE couponID = ? AND userID = ?",
    [couponID, userID],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});


// coupon.delete("/delete", function (req, res) {
//   const{userID, couponID} = req.body;


//   db.exec(
//     "DELETE FROM coupon WHERE couponID = ? AND userID = ?",
//     [couponID, userID],
//     function (results, fields) {
//       res.send(JSON.stringify(results));
//     }
//   );
// });


// //匯出給是app.js使用
module.exports = coupon;