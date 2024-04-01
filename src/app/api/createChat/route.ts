import { NextRequest } from "next/server";
import connectDb from "../../../../connect";
import Chat from "../../../../models/Chat";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json() as { name: string };
        await connectDb();
        const chat = new Chat({name: reqBody.name});
        await chat.save();
        return Response.json({message: 'The chat was successfully created.'});
    } catch (err: any) {
        return Response.json({message: 'An error occurred', error: err});
    }
}