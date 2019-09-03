var TelegramBot = require('node-telegram-bot-api');
var myBot = new TelegramBot(Token, { polling: false });


class Sender{
    constructor(userId,value,type){

    }
    sendErrorMsg(user){
        var text = "упс, что-то пошло не так"
        myBot.sendMessage(user,text)
    }
}
module.exports = Sender