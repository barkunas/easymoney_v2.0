var express = require('express')
var fs = require('fs')
var app = express();

var Message = require('./message/message.js')

const Token = fs.readFileSync('token.txt','utf8')
//console.log(Token)

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

app.get('/', function (req, res) {
  res.status(200).send('Hello World!');
  console.log(req.body)
});

app.post('/'+Token+'/', function (req, res) {
    res.status(200).send("ответттт");
    var messageData = req.body
    var message = new Message()
    console.log(message)
  });




var port = process.env.PORT || /*3000*/ 8080
app.listen(port, function () {
  console.log('Example app listening on port '+ port);
});
  
module.exports = app;