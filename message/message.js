var Sender = require('./sender.js')

class Message {
    constructor(msg, mysql) {
        this.msg = msg
        var message = msg.message
        var msgDataFrom = msg.message.from
        this.update_id = msg.update_id
        this.date = message.date
        this.userId = msgDataFrom.id
        this.first_name = msgDataFrom.first_name || "empty"
        this.last_name = msgDataFrom.last_name || "empty"
        this.username = msgDataFrom.username || "empty"
        this.text = message.text
        this.type = this.getType(message.text);
        this.transactionValue = parseFloat(this.text) || 0
        this.messageTest() ? this.messageRoute(mysql) : console.log("can't read msg")
    }
    getType(value) {
        var valueNum = parseFloat(value)
        var valueNumStr = String(valueNum)
        switch (true) {
            case !isNaN(valueNum) && valueNumStr.length < 11:
                return "double"; break;
            default:
                var userId = this.userId
                new Sender().sendErrorMsg(userId)
                return "unknown"; break;
        }
    }
    messageTest() {
        var result = this.msg.message &&
            this.msg.message.from &&
            this.msg.update_id &&
            this.msg.message.date &&
            this.msg.message.from.id &&
            this.msg.message.text;
        return result

    }
    messageRoute(mysql) {
        switch (this.type) {
            case "double":
                this.addTransactionInt(mysql)
                break;

        }
    }
    addTransactionInt(mysql) {
        var userId = this.userId
        var transactionVal = this.transactionValue
        var valuesArr = [this.date, this.userId, +this.transactionValue]
        mysql.query(
            "INSERT INTO messages (date, userId, transaction) VALUES (?);",
            [valuesArr],
            function (error, results, fields) {
                if (error) throw error;
                console.log('added in DB ' + valuesArr)
                new Sender().sendSuccessTransaction(userId,transactionVal)
            }
        );
    }
}

module.exports = Message