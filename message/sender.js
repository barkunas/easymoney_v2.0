var TelegramBot = require('node-telegram-bot-api');



class Sender{
    constructor(userId,value,type){
        this.userId = userId
        this.value = value
        this.type = type
        this.Token = process.env.TOKEN
        this.myBot = new TelegramBot(this.Token, { polling: false });
    }
    sendErrorMsg(){
        var text = "упс, что-то пошло не так"
        this.myBot.sendMessage(this.userId,text)
    }
    sendSuccessTransaction(){
        var text = "Записал "+ value
        this.myBot.sendMessage(this.userId,text)

    }
}
module.exports = Sender