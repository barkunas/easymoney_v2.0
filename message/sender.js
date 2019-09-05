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
    sendSuccessTransaction(userId, value, discription) {
        var text =
            "Записал " + value + "\n" +
            "описание: " + discription
        this.myBot.sendMessage(userId, text)

    }
    sendMessage(userId, text) {
        this.myBot.sendMessage(userId, text)
    }
    sendCurrentBalance(userId, value) {
        var text = "current balance " + value
        this.myBot.sendMessage(userId, text)
    }
    sendStartMessage(userId) {
        var text = "Привет! Это Бот по контролю за доходами и расходами.\n" +
            "Для добавления доходов просто введите число.\n" +
            "Пример: 10300\n" +
            "Для добавления расходов введите число со знаком минус\n" +
            "Пример: -10300\n" +
            "Также есть возможность добавлять категории или описание\n" +
            "Пример: -10300 машина\n" +
            "Пример: 10300 получил ЗП\n" +
            "На данный момент вы можете посмотреть текущий баланс просто написав слово 'отчет'\n" +
            "Пример: отчет\n"
        this.myBot.sendMessage(userId, text)
    }
}
module.exports = Sender