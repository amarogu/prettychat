import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Chat, IChat } from "../../../../models/Chat";
import { Message } from "../../../../models/Message";
import connectDb from "../../../../connect";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { IUser, User } from "../../../../models/User";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    try {
        await connectDb();
        if (session && session.user?.name) {
            const reqBody = await req.json() as { prompt: string, sender: 'user' | 'system', chatId: string };
            if (reqBody.prompt !== '') {
                const chat = await Chat.findById(reqBody.chatId);
                if (chat) {
                    const msg = new Message({content: reqBody.prompt, sender: reqBody.sender});
                    await msg.save();
                    chat.messages.push(msg._id);
                    await chat.save();
                    const user = User.findOne({name: session.user?.name}) as unknown as IUser;
                    const openai = new OpenAI({apiKey: user.apiKey});
                    const populatedChat = await chat.populate('messages') as unknown as IChat;
                    const completion = await openai.chat.completions.create({
                        model: 'gpt-3.5-turbo',
                        messages: [
                            ...populatedChat.messages.map((msg) => {
                                return {
                                    role: msg.sender,
                                    content: msg.content
                                }
                            })
                        ],
                        stream: true
                    });

                    const stream = OpenAIStream(completion, {
                        onCompletion: async (completion: string) => {
                            const msg = new Message({content: completion, sender: 'system'});
                            await msg.save();
                            chat.messages.push(msg._id);
                            await chat.save();
                        }
                    });

                    return new StreamingTextResponse(stream);
                } else {
                    return new Response(new Blob([JSON.stringify({message: 'This chat does not exist'})], {type: 'application/json'}), {status: 404});
                }
            }
        } else {
            return new Response(new Blob([JSON.stringify({message: 'Unauthenticated'})], {type: 'application/json'}), {status: 401});
        }
    } catch (err: any) {
        return Response.json({message: 'An error occurred', error: err});
    }
}
