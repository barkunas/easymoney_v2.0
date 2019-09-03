var TelegramBot = require('node-telegram-bot-api');



class Sender{
    constructor(userId,value,type){
        this.userId = userId
        this.value = value
        this.type = type
        this.Token = process.env.TOKEN
        this.myBot = new TelegramBot(this.Token, { polling: false });
    }
    sendErrorMsg(userId){
        var text = "упс, что-то пошло не так"
        this.myBot.sendMessage(userId,text)
    }
    sendSuccessTransaction(userId,value){
        var text = "Записал "+ value
        this.myBot.sendMessage(userId,text)

    }
}
module.exports = Sender