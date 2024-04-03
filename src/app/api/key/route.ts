import 'dotenv/config';
import { NextRequest } from 'next/server';
import {User} from '../../../../models/User';
import connectDb from '../../../../connect';
import { Chat } from '../../../../models/Chat';

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json() as {name: string, key: string, password: string};
        await connectDb();
        const user = new User({name: reqBody.name, password: reqBody.password, apiKey: reqBody.key});
        const chat = new Chat({name: reqBody.name});
        await chat.save();
        await user.save();
        return Response.json({message: 'The API key was successfully registered.'});
    } catch(err: any) {
        if (err.message.startsWith('User validation failed: password') as string && err.message.endsWith('minimum allowed length (8).') as string) {
            return Response.json({message: 'Your password is too short'});
        } else if (err.code as number === 11000) {
            if(err.keyPattern.apiKey) {
                return Response.json({message: 'This API key is already registered. Please login'});
            } else if (err.keyPattern.name) {
                return Response.json({message: 'This name is already taken. Please choose another one.'});
            }
        } else {
            return new Response(new Blob([JSON.stringify({message: 'An error occurred'})], {type: 'application/json'}), {status: 500});
        }
    }
}