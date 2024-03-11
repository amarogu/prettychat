export class Message {
    _id: String;
    origin: String;
    content: String;
    __v: Number;

    constructor(_id: String, origin: String, content: String, __v: Number) {
        this.origin = origin
        this.content = content
        this._id = _id
        this.__v = __v
    }
}
export class Chat {
    _id: String;
    title: String;
    description: String;
    messages: Message[]; // Replace Message with the actual type of your messages
    user: String;
    __v: Number;

    constructor(_id: String, title: String, description: String, messages: Array<Message>, user: String, __v: Number) {
        this._id = _id
        this.title = title
        this.description = description
        this.messages = messages
        this.user = user
        this.__v = __v
    }
}

export class User {
    _id: String;
    username: String;

    constructor(_id: String, username: String) {
        this._id = _id
        this.username = username
    }
}