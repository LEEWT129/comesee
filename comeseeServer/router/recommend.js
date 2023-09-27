var express = require("express");
var db = require("../db");
var recommend = express.Router();

recommend.get("/:movieID([0-9]+)", function (req, res) {
  const movieID = req.params.movieID;

  // 找movieID的movieType
  db.exec(
    "SELECT movieType FROM movie WHERE id = ?",
    [movieID],
    function (results, fields) {
      const movieType = results[0].movieType;
      
      // 子類型拆開
      const subTypes = movieType.split(',');
      
      // 用like找只要包含其中一個的類型就可以
      const query = subTypes.map(subType => `movieType LIKE '%${subType}%'`).join(' OR ');
      // res.send(JSON.stringify(query)); // 檢查結果用
      const myRecomment = `SELECT * FROM movie WHERE (${query}) AND id != ? ORDER BY RAND() LIMIT 5`
      console.log(myRecomment)

      // 使用查詢推薦电影
      db.exec(
        myRecomment,
        [movieID],
        function (results, fields) {
          res.send(JSON.stringify(results));
        }
      );
    }
  );
});



recommend.get("/home/:userID([0-9]+)", function (req, res) {
  const userID = req.params.userID;

  // 找userID的moviePreferences
  db.exec(
    "SELECT moviePreferences FROM member WHERE userID = ?",
    [userID],
    function (results, fields) {
      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const moviePreferences = results[0].moviePreferences;
      if (!moviePreferences) {
        return res.status(200).json({ message: "No movie preferences available" });
      }

// 子類型拆開
      const subTypes = moviePreferences.split(',');

      // 用like找只要包含其中一個的類型就可以
      const query = subTypes.map(subType => `movieType LIKE '%${subType}%'`).join(' OR ');
      const homeRecomment = `SELECT * FROM movie WHERE (${query}) ORDER BY RAND() LIMIT 10`
      console.log(homeRecomment)

      // 查詢推薦電影
      db.exec(
        homeRecomment,
        [userID],
        function (results, fields) {
          res.status(200).json(results);
        }
      );
    }
  );
});


// 匯出給是app.js使用
module.exports = recommend;