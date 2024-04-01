import { NextRequest } from "next/server";
import connectDb from "../../../../connect";
import { Chat } from "../../../../models/Chat";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json() as { name: string };
        await connectDb();
        const chats = await Chat.find({name: reqBody.name});
        return Response.json(chats);
    } catch (err: any) {
        return Response.json({message: 'An error occurred', error: err});
    }
}