var Sender = require('../message/sender.js')

class Scenarist {
    constructor(sql) {
        this.sender = new Sender()
        this.sql = sql
        this.minute = 0
        this.hour = 0
        setInterval(() => this.checkCases(), 10000)
    }
    checkCases() {
        let date = new Date()
        let hour = date.getHours()
        let minute = date.getMinutes()
        if (minute != this.minute) {
            this.hour = hour
            this.minute = minute
            let time = ""+hour+":"+minute
            switch (time) {
                case "21:00":
                    this.sendAllDayResume()
                    break;
            }
        }
    };
    sendAllDayResume(){
        
    }
}

module.exports = Scenarist