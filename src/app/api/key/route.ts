const mongoose = require('mongoose');
require('dotenv').config();
import { NextRequest } from 'next/server';
const User = require('../../../../models/User');

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json() as {key: string};
        await mongoose.connect(process.env.MONGODB_URI);
        const user = new User({apiKey: reqBody.key});
        await user.save();
        return Response.json({message: 'The API key was successfully registered.'});
    } catch(err: any) {
        if (err.code as number === 11000) {
            return new Response(new Blob([JSON.stringify({message: 'You have already registered this API key'})], {type: 'application/json'}), {status: 500});
        }
    }
}