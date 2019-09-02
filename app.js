var express = require('express')
var fs = require('fs')
var app = express();

const Token = fs.readFileSync('token.txt','utf8')
//console.log(Token)

app.get('/', function (req, res) {
  res.status(200).send('Hello World!');
  console.log(req)
});

app.get('/'+Token+'/', function (req, res) {
    res.status(200).send("ответттт");
    console.log(req)
  });




var port = process.env.PORT || 8080
app.listen(port, function () {
  console.log('Example app listening on port '+ port);
});
  
module.exports = app;