import bcrypt from "bcrypt";
import mongoose from "mongoose";
if (mongoose.models.Message) {
    mongoose.deleteModel('Message');
}

const messageSchema = new mongoose.Schema({
    sender: {
        type: 'user' || 'system',
        required: true
    },
    content: {
        type: String,
        required: true,
        maxlength: 10240
    }
});

const Message = mongoose.model('Message', messageSchema);
export default Message;