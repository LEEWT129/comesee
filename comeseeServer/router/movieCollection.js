var express = require("express");
var db = require("../db");
var movieCollection = express.Router();

//獲取該userID收藏了幾部電影
movieCollection.get("/:userID([0-9]+)", function (req, res) {
  let userID = req.params.userID;
  let sql =
    "SELECT COUNT(*) AS count FROM movieinplaylist AS mip LEFT JOIN playlist as p ON mip.playlistID = p.playlistID WHERE userID = ?";
  db.exec(sql, [userID], function (results, fields) {
    res.send(JSON.stringify(results));
  });
});

//這個路由匯出以後是app.js使用
module.exports = movieCollection;
