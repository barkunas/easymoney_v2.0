export class Message{
    constructor(msg){
        var message = msg.message
        var msgDataFrom = msg.message.from
        this.update_id = msg.update_id
        this.date = message.date
        this.userId = msgDataFrom.id
        this.first_name = msgDataFrom.first_name||"empty"
        this.last_name = msgDataFrom.last_name||"empty"
        this.username = msgDataFrom.username||"empty"
        this.text = message.text
    }
}