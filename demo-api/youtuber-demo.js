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
let id = 1
db.set(id++, youtuber1);
db.set(id++, youtuber2);

//REST API 설계
app.get('/youtubers', (_req, res)=>{
  res.json([...db.values()])
  //방법1
  // const youtubersArray = Array.from(db.values());
  //res.json(youtubersArray);

  //방법2
  // let youtubersObject = {};
  // db.forEach((value, key) => {
  //   youtubersObject[key] = value;
  // });
  // res.json(youtubersObject);
})


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

app.use(express.json()) //http 외 모듈인 '미들웨어' : json 설정
app.post('/youtuber', (req,res)=>{
  //body에 숨겨져서 들어온 데이터를 화면에 뿌려줘볼가?

  console.log(req.body)

  db.set(id++,req.body)

  res.json({
    message: `${req.body.channelTitle}님, 유투버 생활을 응원합니다`
  })
})
