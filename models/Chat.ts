import bcrypt from "bcrypt";
import mongoose from "mongoose";
if (mongoose.models.Chat) {
    mongoose.deleteModel('Chat');
}

const chatSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Message',
        required: true
    }
})

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;