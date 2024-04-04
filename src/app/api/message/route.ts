import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Chat, IChat } from "../../../../models/Chat";
import { Message } from "ai/react";
import { Message as PersistentMsg } from "../../../../models/Message";
import OpenAI from 'openai';
import { User } from "../../../../models/User";
import { OpenAIStream, StreamingTextResponse } from 'ai';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    try {
        if (session && session.user?.name) {
            const reqBody = await req.json() as { messages: Message[], chatId: string };
            const chat = await Chat.findById(reqBody.chatId); 
            if (chat) {
                if (session.user?.name === chat.name) {
                    // manage db operations
                    const messages = reqBody.messages.map(msg => {
                        const message = new PersistentMsg({content: msg.content, role: msg.role, chatId: chat._id})
                        return message;
                    });
                    const messageIds = messages.map(msg => msg._id);
                    chat.messages = messageIds;
                    // Delete messages that belong to the chat before saving new messages, except for the messages that are in the chat.messages array
                    await chat.save();
                    await PersistentMsg.insertMany(messages);
                    await PersistentMsg.deleteMany({chatId: chat._id, _id: {$nin: messageIds}});

                    // generate completion
                    // 1 get user's openai key
                    // 2 generate completion
                    const user = await User.findOne({name: session.user.name});
                    const openai = new OpenAI({apiKey: user?.apiKey});
                    const completion = await openai.chat.completions.create({
                        model: 'gpt-3.5-turbo',
                        messages: messages.map(msg => ({role: msg.role as 'system' | 'assistant' | 'user', content: msg.content})),
                        stream: true
                    })
                    // 3 stream completion
                    const stream = OpenAIStream(completion, {
                        onCompletion: async (res) => {
                            const message = new PersistentMsg({content: res, role: 'assistant', chatId: chat._id});
                            await message.save();
                            chat.messages.push(message._id);
                            await chat.save();
                        }
                    });

                    return new StreamingTextResponse(stream);
                } else {
                    return new Response(new Blob([JSON.stringify({message: 'You are not authorized to delete this chat'})], {type: 'application/json'}), {status: 403});
                }
            } else {
                return new Response(new Blob([JSON.stringify({message: 'Chat not found'})], {type: 'application/json'}), {status: 404});
            }
        } else {
            return new Response(new Blob([JSON.stringify({message: 'Unauthenticated'})], {type: 'application/json'}), {status: 401});
        }
    } catch (err: any) {
        return Response.json({message: 'An error occurred', error: err});
    }
}
