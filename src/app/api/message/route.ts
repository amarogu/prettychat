import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Chat } from "../../../../models/Chat";
import { Message } from "../../../../models/Message";
import connectDb from "../../../../connect";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    try {
        await connectDb();
        if (session) {
            const reqBody = await req.json() as { content: string, sender: 'user' | 'system', chatId: string };
            const chat = await Chat.findById(reqBody.chatId);
            if (chat) {
                const msg = new Message({content: reqBody.content, sender: reqBody.sender});
                await msg.save();
                chat.messages.push(msg._id);
                await chat.save();
            } else {
                return new Response(new Blob([JSON.stringify({message: 'This chat does not exist'})], {type: 'application/json'}), {status: 404});
            }
        } else {
            return new Response(new Blob([JSON.stringify({message: 'Unauthenticated'})], {type: 'application/json'}), {status: 401});
        }
    } catch (err: any) {
        return Response.json({message: 'An error occurred', error: err});
    }
}