import { NextRequest } from "next/server";
import User from "../../../../models/User";
import connectDb from "../../../../connect";
import 'dotenv/config';

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json() as {key: string};
        await connectDb();
        const matchingKey = await User.findOne({apiKey: reqBody.key});
        if (matchingKey) {
            return Response.json({message: 'match found'});
        } else {
            return Response.json({message: 'no match found'});
        }
    } catch {
        return new Response(new Blob([JSON.stringify({message: 'An error occurred'})], {type: 'application/json'}), {status: 400});
    }
}