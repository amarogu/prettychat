import { NextRequest } from "next/server";
import connectDb from "../../../../connect";
import { Chat } from "../../../../models/Chat";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    const session = await getServerSession(authOptions);
    try {
        if (session) {
            await connectDb();
            const chat = new Chat({name: session.user?.name});
            await chat.save();
            return Response.json({message: 'The chat was successfully created.'});
        } else {
            return new Response(new Blob([JSON.stringify({message: 'Unauthenticated'})], {type: 'application/json'}), {status: 401});
        }
    } catch (err: any) {
        return Response.json({message: 'An error occurred', error: err});
    }
}