import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { Chat, IChat } from "../../../../models/Chat";
import OpenAI from "openai";
import { User } from "../../../../models/User";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    try {
        if (session && session.user?.name) {
            const reqBody = await req.json() as { chatId: string };
            const chat = await Chat.findById(reqBody.chatId);
            if (chat) {
                if (session.user.name === chat.name) {
                    const populatedChat = await chat.populate('messages') as unknown as IChat;
                    const formattedMsgs = populatedChat.messages.map(msg => {
                        return {
                            role: msg.role,
                            content: msg.content
                        }
                    });
                    const user = await User.findOne({name: session.user.name});
                    const openai = new OpenAI({apiKey: user?.apiKey});
                    const completion = await openai.chat.completions.create({
                        model: 'gpt-3.5-turbo',
                        messages: [{role: 'system', content: ''}]
                    })
                } else {
                    return new Response(new Blob([JSON.stringify({message: 'You are not authorized to access or modify this chat'})], {type: 'application/json'}), {status: 403});
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