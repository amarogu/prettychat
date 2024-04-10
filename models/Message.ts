import mongoose from "mongoose";
if (mongoose.models.Message) {
    mongoose.deleteModel('Message');
}

export interface IMessage {
    _id: string;
    chatId: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
    role: "function" | "user" | "system" | "assistant" | "data" | "tool";
    content: string;
}

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'system', 'assistant', 'data', 'tool', 'function'],
        required: true
    },
    content: {
        type: String || Array<Number>,
        required: true,
        maxlength: 10240
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    }
}, {timestamps: true});

export const Message = mongoose.model('Message', messageSchema);