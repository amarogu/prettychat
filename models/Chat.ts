import mongoose from "mongoose";
import { IMessage, Message } from "./Message";
if (mongoose.models.Chat) {
    mongoose.deleteModel('Chat');
}

export interface IChat {
    _id: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    title: string;
    messages: IMessage[];
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
        ref: Message,
        required: true
    },
}, {timestamps: true})

export const Chat = mongoose.model('Chat', chatSchema);