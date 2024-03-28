import { NextRequest } from "next/server";

const mongoose = require('mongoose');
const User = require('../../../../models/User');

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json() as {key: string};
        await mongoose.connect(process.env.MONGODB_URI);
        const matchingKey = await User.findOne({apiKey: reqBody.key});
        if (matchingKey) {
            return Response.json({message: 'match found'});
        } else {
            return Response.json({message: 'no match found'});
        }
    } catch {
        return Response.json({message: 'An error occurred.'});
    }
}