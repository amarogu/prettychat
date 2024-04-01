import bcrypt from "bcrypt";
import mongoose from "mongoose";
if (mongoose.models.Chat) {
    mongoose.deleteModel('Chat');
}

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
        default: 'New chat'
    },
    messages: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Message',
        required: true
    },
}, {timestamps: true})

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;