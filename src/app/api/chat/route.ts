import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDb from "../../../../connect";
import { Chat } from "../../../../models/Chat";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    try {
        if (session) {
            const reqBody = await req.json() as {chatId: string};
            await connectDb();
            const chat = await Chat.findById(reqBody.chatId);
            if (chat) {
                return Response.json(chat.populate('messages'));
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