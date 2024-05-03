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
let id = 1;
db.set(id++, youtuber1);
db.set(id++, youtuber2);

//REST API 설계
app.get("/youtubers", (_req, res) => {
  // res.json([...db.values()]);
  //방법1
  // const youtubersArray = Array.from(db.values());
  //res.json(youtubersArray);

  //방법2
  let youtuber = {};

if(db.size!==0){
  db.forEach((value, key) => {
    youtuber[key] = value;
  });
  res.json(youtuber);
} else {
  res.status(404).json({
    message:'조회할 그게 없습니다'
  })
}

 
});

app.get("/youtubers/:id", function (req, res) {
  let { id } = req.params;
  id = parseInt(id);
  const youtube = db.get(id);

  if (youtube === undefined) {
    res.status(404).send(`유투버는 확인 할 수 없습니다`);
  } else {
    res.json(youtube);
  }
});

app.use(express.json()); //http 외 모듈인 '미들웨어' : json 설정
app.post("/youtubers", (req, res) => {
  const {channelTitle} = req.body
  if(channelTitle){
    db.set(id++, req.body);
    res.status(201).json({
      message: `${req.body.channelTitle}님, 유투버 생활을 응원합니다`,
    });
  } else {
    res.status(400).json({
      message:"요청 값을 제대로 보내주세요"
    })
  }

 
});

app.delete("/youtubers/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  let youtuber = db.get(id);
  if (youtuber == undefined) {
    res.json({
      message: `요청하신${id}번은 없는 유투버입니다.`,
    });
  } else {
    const channelTitle = youtuber.channelTitle;

    db.delete(id);
    res.json({
      message: `${channelTitle}님 채널이 삭제되었습니다.`,
    });
  }
});

app.delete("/youtubers", (_req, res) => {
  let msg = "";
  if (db.size === 0) {
    msg = "삭제할 유투버가 없습니다.";
  } else {
    db.clear();
    msg = "전체 삭제가 되었습니다.";
  }
  res.json({ message: msg });
});

app.put("/youtubers/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  let youtuber = db.get(id);
  if (youtuber == undefined) {
    res.json({
      message: `요청하신${id}번은 없는 유투버입니다.`,
    });
  } else {
    let newTitle = req.body.channelTitle;
    youtuber.channelTitle = newTitle;
    db.set(id, youtuber);
  }
  res.json({
    message: "수정됨",
  });
});
