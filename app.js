var express = require('express')
var fs = require('fs')
require('dotenv').config()
const bodyParser = require('body-parser');
const connection = require('./database/database');
var Message = require('./message/message.js')

var app = express();

const Token = fs.readFileSync('token.txt', 'utf8')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.status(200).send('Hello World!');
    console.log(req.body)
});

app.post('/' + Token + '/', function (req, res) {
    var messageData = req.body
    var message = new Message(messageData)
    if (message.messageTest()) {
        console.log(message)
    } else {
        console.log("can't read msg")
    }
    res.status(200).send("update from bot completed");
});

//--------------------------------mysqlTest
app.route('/addUser/:userId')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM easyMoneyDB.messages;", req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

app.get('/status', (req, res) => res.send('Working!'));

//--------------------------------endMysqlTest








var port = process.env.PORT || /*3000*/ 8080
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});

module.exports = app;