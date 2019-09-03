process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
process.env.NTBA_FIX_319 = 1;
var express = require('express')
var fs = require('fs')
require('dotenv').config()
const bodyParser = require('body-parser');
const connection = require('./database/database');
module.exports.connection = connection
var Message = require('./message/message.js')

var app = express();

process.env.TOKEN = fs.readFileSync('token.txt', 'utf8')
var Token = process.env.TOKEN
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.status(200).send('Hello World!');
    console.log(req.body)
});

app.post('/' + Token + '/', function (req, res) {
    var messageData = req.body
    var message = new Message(messageData, connection)
    res.status(200).send("update from bot completed");
});

app.route('/addUser/:userId')
    .get(function (req, res) {
        connection.query(
            "SELECT * FROM messages;",
            function (error, results, fields) {
                if (error) throw error;
                res.json(results);
            }
        );
    });

app.get('/status', (req, res) => res.send('Working!'));


var port = process.env.PORT || /*3000*/ 8080
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});

module.exports = app;