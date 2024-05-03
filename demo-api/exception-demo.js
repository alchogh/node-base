const express = require('express')
const app = express()
app.listen(1234)

const fruits = [
  {id:1 , name:'apple'},
  {id:2 , name:'orange'},
  {id:3 , name:'strawberry'},
  {id:3 , name:'blueberry'},
]
//과일 전체 조회
app.get('/fruits', (_req,res)=>{
  res.json(fruits)
})

//과일 개별 조회
app.get('/fruits/:id', (req, res)=>{
  const {id} = req.params
  //방법1
  // let fruit = fruits[id-1]

  //방법2 fruits 배열 안에 있는 객체 중 id값이 params.id랑 같을 때
  let findFruit = fruits.find(f=>f.id ==id)

  //방법3
  // fruits.forEach((fruit)=>{
  //   if(fruit.id ==id){
  //     findFruit = fruit
  //   }
  // })
  if(findFruit){
    res.json(findFruit)
  } else {
    res.status(404).json('전달주신 id로 저장된 과일이 없습니다')
  }
})