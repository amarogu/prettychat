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
        if (session) {
            if (chat) {
                if (session.user?.name === chat.name) {
                    await chat.deleteOne();
                    return Response.json({message: 'The chat was successfully deleted.'});
                } else {
                    return new Response(new Blob([JSON.stringify({message: 'You are not authorized to delete this chat'})], {type: 'application/json'}), {status: 403});
                }
            }
        } else {
            return new Response(new Blob([JSON.stringify({message: 'Unauthenticated'})], {type: 'application/json'}), {status: 401});
        }
    } catch (err: any) {

    }
}