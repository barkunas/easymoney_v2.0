var Sender = require('../message/sender.js')
class SQLrouter {
    constructor(sql) {
        this.sql = sql
    }
    addNumTransaction(valuesArr) {
        this.sql.query(
            "INSERT INTO messages (date, userId, transaction) VALUES (?);",
            [valuesArr],
            function (error, results, fields) {
                if (error) throw error;
                console.log('added in DB ' + valuesArr)
                new Sender().sendSuccessTransaction(valuesArr[1], valuesArr[2])
            }
        );
    }
    getSummbyUser(userId){
        this.sql.query(
            "Select SUM(transaction) from messages WHERE userId='?';",
            userId,
            function (error, results, fields) {
                if (error) throw error;
                console.log('get current balance user ' + userId = results[0]['SUM(transaction)'])
                new Sender().sendCurrentBalance(userId, results[0]['SUM(transaction)'])
            }
        )
    }
}
module.exports = SQLrouter