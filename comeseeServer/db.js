// 連線至資料庫

var mysql = require("mysql");

// module 被省略掉了
// 如果物件沒有 exec屬性，就會立刻馬上被新增
// 當前新增的是箭頭函式
exports.exec = (sql, data, callback) => {

  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project",
    port: 3306,

    //是否允許使用者一口氣傳入很多SQL指令
    multipleStatements: true,
  });
  connection.connect();

  connection.query(sql, data, function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    callback(results, fields);
  });
  connection.end();
};
