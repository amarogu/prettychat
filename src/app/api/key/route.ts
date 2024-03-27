const mongoose = require('mongoose');
require('dotenv').config();
import { NextRequest } from 'next/server';
const User = require('../../../../models/User');

export async function POST(req: NextRequest) {
    const reqBody = await req.json() as {key: string};
    await mongoose.connect(process.env.MONGODB_URI);
    const user = new User({apiKey: reqBody.key});
    await user.save();
    return Response.json({message: 'Connected to MongoDB'});
}