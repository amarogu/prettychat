import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { Chat, IChat } from "../../../../models/Chat";
import { IMessage } from "../../../../models/Message";
import OpenAI from "openai";
import { User } from "../../../../models/User";

const generateTitle = async (msgs: {role: 'system' | 'assistant' | 'user', content: IMessage['content']}[], openai: OpenAI) => {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{role: 'system', content: 'If the conversation has a topic, output it in a sentence of two words, at maximum. If it does not, output the string false.'}, ...msgs],
        n: 1,
    })
    if (completion.choices[0].message.content !== 'false' && completion.choices[0].message.content !== 'False') {
        return completion.choices[0].message.content;
    } else {
        return 'New chat';
    }
}

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
                            role: msg.role as 'system' | 'assistant' | 'user',
                            content: msg.content
                        }
                    });
                    const user = await User.findOne({name: session.user.name});
                    const openai = new OpenAI({apiKey: user?.apiKey});
                    chat.title = await generateTitle(formattedMsgs, openai) ?? 'New chat';
                    await chat.save();
                    if (chat.title !== 'New title') {
                        return Response.json({message: 'Title successfully generated'});
                    } else {
                        return Response.json({message: 'Title not generated'});
                    }
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