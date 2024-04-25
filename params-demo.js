const express = require('express')
const app = express()

app.listen(8888)


let book = {
  title:'node',
  price:20000,
  description:'가나다라'
}

app.get('/products/:n', function(req,res){
  // : => 어? 나한테 URL로 매개변수를 전달해줄 건 가보다
  //products/--빈칸에 오는 값ㅇ르 n이라는 변수에 담아줘
  res.json({
    num:req.params.n
  })
})