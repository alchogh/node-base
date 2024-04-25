const express = require("express");
const app = express();
app.listen(1234);

app.get("/", function (req, res) {
  res.send("hello world");
});

//localhost:1234/1 => notebook

app.get("/:id", function (req, res) {
  let { id } = req.params;

  id = parseInt(id);

  if (db.get(id) == undefined) {
    res.json({
      message: "없는 상품입니다.",
    });
  } else {
    res.json({
      id,
      productName: db.get(id),
    });
  }
});

let db = new Map();

db.set(1, "notebook"); //키로 벨류를 찾을 수 있는 한 쌍을 저장
db.set(2, "cup");

console.log(db);
console.log(db.get(1));

//신입 사원 역량 반드시 알아야 하는 자료구조
//Map. List
