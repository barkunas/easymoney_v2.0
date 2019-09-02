class Message{
    constructor(msg){
        this.msg = msg
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
    messageTest(msg = this.msg){
        if(!!msg.message)return false;
        if(!!msg.message.from)return false;
        if(!!msg.update_id)return false;
        if(!!message.date)return false;
        if(!!msgDataFrom.id)return false;
        if(!!message.text)return false; 
        return true     

    }
}

module.exports = Message