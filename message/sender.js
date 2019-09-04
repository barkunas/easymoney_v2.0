var TelegramBot = require('node-telegram-bot-api');



class Sender {
    constructor(userId, value, type) {
        this.userId = userId
        this.value = value
        this.type = type
        this.Token = process.env.TOKEN
        this.myBot = new TelegramBot(this.Token, { polling: false });
    }
    sendErrorMsg(userId) {
        var text = "упс, что-то пошло не так"
        this.myBot.sendMessage(userId, text)
    }
    sendSuccessTransaction(userId, value) {
        var text = "Записал " + value
        this.myBot.sendMessage(userId, text)

    }
    sendCurrentBalance(userId, value) {
        var text = "current balance " + value
        this.myBot.sendMessage(userId, text)
    }
    sendStartMessage(userId){
        var text = "Привет! Это Бот по контролю за доходами и расходамии.\n"+
                    "Для добавления доходов просто введите число.\n"+
                    "Пример: 10300\n"+
                    "Для добовления расходов введите число со знаком минус вначале\n"+
                    "Пример: 10300\n"+
                    "На данный момент вы можете посомтреть текущий баланс просто написав слово 'отчет'\n"+
                    "Пример: отчет\n"
        this.myBot.sendMessage(userId, text)
    }
}
module.exports = Sender