var express = require("express");
var db = require("../db");
var commentlist = express.Router();

//以userID取得(movieNameCN, userName, sendTime, score, comment)

// commentlist.get("/:userID([0-9]+)", function (req, res) {
//   let userID = req.params.userID;
//   db.exec(
//     "SELECT movieNameCN, userName, sendTime, score, comment FROM commentlist AS c LEFT JOIN movie AS mv ON c.movieID=mv.id LEFT JOIN member AS mem ON mem.userID=c.userID WHERE c.userID = ?",
//     [userID],
//     function (results, fields) {
//       console.log(results);
//       if (results.length > 0) {
//         res.send(JSON.stringify(results));
//       } else {
//         res.end();
//       }
//       // else {
//       //   res.status(404).json({ error: "該user尚未撰寫過評論" });
//       // }
//     }
//   );
// });

commentlist.get("/:userID([0-9]+)", function (req, res) {
  let userID = req.params.userID;
  db.exec(
    "SELECT movieNameCN, userName, sendTime, score, comment, imageUrl FROM commentlist AS c LEFT JOIN movie AS mv ON c.movieID=mv.id LEFT JOIN member AS mem ON mem.userID=c.userID WHERE c.userID = ?",
    [userID],
    function (results, fields) {
      console.log(results);
      if (results.length > 0) {
        res.send(JSON.stringify(results));
      } else {
        res.end();
      }
      // else {
      //   res.status(404).json({ error: "該user尚未撰寫過評論" });
      // }
    }
  );
});
//這個路由匯出以後是app.js使用
module.exports = commentlist;
