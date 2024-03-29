import mongoose from 'mongoose';
import 'dotenv/config';
import { NextRequest } from 'next/server';
import User from '../../../../models/User';

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json() as {name: string, key: string, password: string};
        await mongoose.connect(process.env.MONGODB_URI);
        const user = new User({name: reqBody.name, password: reqBody.password, apiKey: reqBody.key});
        await user.save();
        return Response.json({message: 'The API key was successfully registered.'});
    } catch(err: any) {
        if (err.code as number === 11000) {
            return Response.json({message: 'This API key is already registered. Please login'});
        } else {
            return new Response(new Blob([JSON.stringify({message: 'An error occurred'})], {type: 'application/json'}), {status: 500});
        }
    }
}