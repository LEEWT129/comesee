var express = require("express");
// var db = require("../db");
var m = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public"); // 指定上傳到public資料夾
  },
  filename: function (req, file, cb) {
    const userId = req.body.userID; // 從post獲取userID
    console.log(req.body.userID);
    const fileName = userId + "-" + Date.now() + "-" + file.originalname; // 使用userID作为一部分文件名
    cb(null, fileName);
  },
});

const upload = multer({ storage });

m.post("/upload", upload.single("avatar"), (req, res) => {
  res.send("上傳成功");
});

//這個路由匯出以後是app.js使用
module.exports = m;
