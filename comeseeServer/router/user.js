var express = require("express");
const multer = require("multer");

var db = require("../db");
var user = express.Router();
const path = require('path');

//上傳大頭貼
user.use("/image", express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

user.post("/uploads/:userID([0-9]+)", upload.single("image"), (req, res) => {
  const image = req.file.filename;
  const user = req.params.userID;
  const sql = "UPDATE member SET image = ? WHERE userID = ?";

  db.exec(sql, [image, user], (req, results) => {
    res.send(JSON.stringify(results));
  })
});

user.get("/image/:userID([0-9]+)", function (req, res) {
  let userID = req.params.userID;
  db.exec("SELECT image FROM member WHERE userID = ?", [userID], 
  function (results, fields) {
    res.send(JSON.stringify(results));
  });
});


//取得全部user
user.get("/", function (req, res) {
  db.exec("SELECT * FROM member", [], function (results, fields) {
    res.send(JSON.stringify(results));
  });
});

// 查詢特定userID的資料
user.get("/:userID([0-9]+)", function (req, res) {
  let userID = req.params.userID;
  db.exec(
    "SELECT * FROM member WHERE userID = ?",
    [userID],
    function (results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});


// 以email查詢其userID
user.get("/getuserID/:email", function (req, res) {
  let email = req.params.email;
  // let email = req.body.email;
  db.exec(
    "SELECT userID FROM member WHERE email = ?",
    [email],
    function (results, fields) {
      res.send(JSON.stringify(results[0].userID));
    }
  );
});

//新增user資訊，註冊會員
user.post("/", function (req, res) {
  let body = req.body;
  let data = [body.userName, body.email];

  db.exec(
    "INSERT INTO member(userName, email) VALUES(?,?)",
    data,
    function (results, fields) {
      if (results.insertId) {
        res.json({ result: 1 });
      } else {
        res.json({ result: 0 });
      }
    }
  );
});

//刪除特定user資料
user.delete("/:userID([0-9]+)", function (req, res) {
  let userID = req.params.userID;
  db.exec(
    "DELETE FROM member WHERE userID = ?",
    [userID],
    function (results, fields) {
      if (results.affectedRows) {
        res.json({ result: 1 });
      } else {
        res.json({ result: 0 });
      }
    }
  );
});

//修改user資訊(url傳入的userID是要針對哪個userID去更改他的userName和email)
user.put("/:userID([0-9]+)", function (req, res) {
  let {
    userName,
    gender,
    birthday,
    selectedCity,
    selectedTown,
    address,
    selfintro,
  } = req.body;
  let userID = req.params.userID;

  let data = [
    userName,
    gender,
    birthday,
    selectedCity,
    selectedTown,
    address,
    selfintro,
    userID,
  ];
  db.exec(
    "UPDATE member SET userName=?, gender=?, birthday=?, addressCity=?, addressTown=?, addressDetail=?, selfintro=? WHERE userID = ?",
    data,
    function (results, fields) {
      if (results.affectedRows) {
        res.json({ result: 1 });
      } else {
        res.json({ result: 0 });
      }
    }
  );
});



//這個路由匯出以後是app.js使用
module.exports = user;