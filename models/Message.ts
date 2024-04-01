import mongoose from "mongoose";
if (mongoose.models.Message) {
    mongoose.deleteModel('Message');
}

export interface IMessage {
    _id: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
    sender: 'user' | 'system';
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
}, {timestamps: true});

export const Message = mongoose.model('Message', messageSchema);