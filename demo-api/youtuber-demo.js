//express 세팅
const express = require("express");
const app = express();
app.listen(3000);

//데이터 세팅
let youtuber1 = {
  channelTitle: "십오야",
  sub: "452명",
  videoNum: "993개",
};

let youtuber2 = {
  channelTitle: "침착",
  sub: "45132명",
  videoNum: "21.3개",
};

let db = new Map();
db.set(1, youtuber1);
db.set(2, youtuber2);

//REST API 설계

app.get("/youtuber/:id", function (req, res) {
  let { id } = req.params;
  id = parseInt(id);
  const youtube = db.get(id);

  if (youtube === undefined) {
    res.status(404).send(`유투버는 확인 할 수 없습니다`);
  } else {
    res.json(youtube);
  }
});
