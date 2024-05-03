const express = require('express')
const app = express()



let book = {
  title:'node',
  price:20000,
  description:'asdfasdf'
}

app.get('/products/1', function(err,res){
  res.json(book)
})


app.get('/test', function(err,res){
  res.json(a) 
})

app.listen(8888)