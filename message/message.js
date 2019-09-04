var Sender = require('./sender.js')
var SQLrouter = require('../database/SQLrouter.js')

class Message {
    constructor(msg, mysql) {
        this.msg = msg
        var message = msg.message||msg.edited_message
        var msgDataFrom = message.from
        this.update_id = msg.update_id
        this.date = message.date
        this.userId = msgDataFrom.id
        this.first_name = msgDataFrom.first_name || "empty"
        this.last_name = msgDataFrom.last_name || "empty"
        this.username = msgDataFrom.username || "empty"
        this.text = message.text||undefined
        this.type = this.getType(message.text);
        this.transactionValue = parseFloat(this.text) || 0
        this.sqlRouter = new SQLrouter(mysql)
        this.messageTest() ? this.messageRoute(mysql) : console.log("can't read msg")

    }
    getType(value) {
        var valueNum = parseFloat(value)
        var valueNumStr = String(valueNum)
        switch (true) {
            case !isNaN(valueNum) && valueNumStr.length < 11:
                return "double"; break;
            case value=="отчет":
                return "smplSumm"; break;
            case value=="/start": 
                return "start"; break;
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
            case "smplSumm":
                this.getSummbyUser(mysql)
                break;
            case "start":
                var userId = this.userId
                new Sender().sendStartMessage(userId)
                break;

        }
    }
    getSummbyUser(mysql){
        var userId = this.userId
        this.sqlRouter.getSummbyUser(userId)
    }
    addTransactionInt(mysql) {
        var userId = this.userId
        var transactionVal = this.transactionValue
        var date = this.date
        var valuesArr = [date, userId, +transactionVal]
        console.log(valuesArr);
        this.sqlRouter.addNumTransaction(valuesArr)
    }
}

module.exports = Message