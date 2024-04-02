import { NextRequest } from "next/server";
import connectDb from "../../../../connect";
import { Chat, IChat } from "../../../../models/Chat";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {

    const session = await getServerSession(authOptions);

    try {
        await connectDb();
        const reqBody = await req.json() as { _id: string };
        const chat = await Chat.findById({ _id: reqBody._id});
        const chats = await Chat.find();
        if (session) {
            if (chat) {
                if (session.user?.name === chat.name) {
                    if (chats.length > 1) {
                        await chat.deleteOne();
                        return Response.json({message: 'The chat was successfully deleted.'});
                    } else {
                        await chat.deleteOne();
                        const newChat = new Chat({name: session.user?.name});
                        await newChat.save();
                        return Response.json({message: 'The chat was successfully deleted. A new chat was created.'});
                    }
                } else {
                    return new Response(new Blob([JSON.stringify({message: 'You are not authorized to delete this chat'})], {type: 'application/json'}), {status: 403});
                }
            }
        } else {
            return new Response(new Blob([JSON.stringify({message: 'Unauthenticated'})], {type: 'application/json'}), {status: 401});
        }
    } catch (err: any) {
        return Response.json({message: 'An error occurred', error: err});
    }
}