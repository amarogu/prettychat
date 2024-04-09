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
            const reqBody = await req.json() as { messages: Message[], chatId: string, model: string, useMd: boolean };
            const chat = await Chat.findById(reqBody.chatId); 
            if (chat) {
                if (session.user?.name === chat.name) {
                    
                    const messages = reqBody.messages.map(msg => {
                        const message = new PersistentMsg({content: msg.content, role: msg.role, chatId: chat._id})
                        return message;
                    });
                    const messageIds = messages.map(msg => msg._id);
                    chat.messages = messageIds;
                    
                    await chat.save();
                    await PersistentMsg.insertMany(messages);
                    await PersistentMsg.deleteMany({chatId: chat._id, _id: {$nin: messageIds}});

                    const user = await User.findOne({name: session.user.name});
                    const completion = await generateCompletion(user, reqBody, messages);
                    
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

async function generateCompletion(user: (import("mongoose").Document<unknown, {}, { name: string; apiKey: string; password: string; }> & { name: string; apiKey: string; password: string; } & { _id: import("mongoose").Types.ObjectId; }) | null, reqBody: { messages: Message[]; chatId: string; model: string; useMd: boolean; }, messages: (import("mongoose").Document<unknown, {}, { createdAt: NativeDate; updatedAt: NativeDate; } & { role: "function" | "user" | "system" | "assistant" | "data" | "tool"; content: string; chatId: import("mongoose").Types.ObjectId; }> & { createdAt: NativeDate; updatedAt: NativeDate; } & { role: "function" | "user" | "system" | "assistant" | "data" | "tool"; content: string; chatId: import("mongoose").Types.ObjectId; } & { _id: import("mongoose").Types.ObjectId; })[]) {
    const openai = new OpenAI({ apiKey: user?.apiKey });
    const completion = await openai.chat.completions.create({
        model: reqBody.model,
        messages: reqBody.useMd ? [{ role: 'system', content: 'Respond to the user in Markdown notation' }, ...messages.map(msg => ({ role: msg.role as 'system' | 'assistant' | 'user', content: msg.content }))] : messages.map(msg => ({ role: msg.role as 'system' | 'assistant' | 'user', content: msg.content })),
        stream: true
    });
    return completion;
}

