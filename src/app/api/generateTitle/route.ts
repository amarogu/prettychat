import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { Chat } from "../../../../models/Chat";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    try {
        if (session && session.user?.name) {
            const reqBody = await req.json() as { chatId: string };
            const chat = await Chat.findById(reqBody.chatId);
            if (chat) {
                if (session.user.name === chat.name) {
                    
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