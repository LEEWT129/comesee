var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var orderlist = require("./router/orderlist");
var recommend = require("./router/recommend");
var playlist = require("./router/playlist");
var seat = require("./router/seat");
var user = require("./router/user");
var quickorder = require("./router/quickorder");
var booking = require("./router/booking");
var bonus = require("./router/bonus");
var coupon = require("./router/coupon");
var filmlist = require("./router/filmlist");
var filminfo = require("./router/filminfo");
var socialhome = require("./router/socialhome");
var commentlist = require("./router/commentlist");
var login = require("./router/login");
var register = require("./router/register");
var comment = require("./router/comment");
var movieCollection = require("./router/movieCollection");
var forgotpassword = require("./router/forgotpassword");
var resetpassword = require("./router/resetpassword");

var m = require("./router/multer");

var cors = require("cors");

//解析json資料
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 跨域
app.use(cors());

//使用靜態檔案
app.use("/", express.static("public"));

app.use("/orderlist", orderlist);
app.use("/recommend", recommend);
app.use("/user", user);
app.use("/seat", seat);
app.use("/playlist", playlist);
app.use("/quickorder", quickorder);
app.use("/booking", booking);
app.use("/bonus", bonus);
app.use("/coupon", coupon);
app.use("/filmlist", filmlist);
app.use("/filminfo", filminfo);
app.use("/socialhome", socialhome);
app.use("/commentlist", commentlist);
app.use("/login", login);
app.use("/register", register);
app.use("/comment", comment);
app.use("/orderlist", orderlist);
app.use("/movieCollection", movieCollection);
app.use("/forgotpassword", forgotpassword);
app.use("/resetpassword", resetpassword);
app.use("/multer", m);

app.listen(2407, function () {
  console.log("伺服器啟動中");
});
