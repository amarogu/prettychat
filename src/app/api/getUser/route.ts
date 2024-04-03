import { NextRequest } from "next/server";
import connectDb from "../../../../connect";
import {User} from "../../../../models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    try {
        if (session) {
            if (session.user?.name) {
                await connectDb();
                const user = await User.findOne({name: session.user.name});
                if (!user) {
                    return new Response(new Blob([JSON.stringify({message: 'User not found'})], {type: 'application/json'}), {status: 404});
                }
                return Response.json(user);
            } else {
                return new Response(new Blob([JSON.stringify({message: 'User not found'})], {type: 'application/json'}), {status: 404});
            }
        } else {
            return new Response(new Blob([JSON.stringify({message: 'Unauthenticated'})], {type: 'application/json'}), {status: 401});
        }
    } catch (err: any) {
        return Response.json({message: 'An error occurred', error: err});
    }
}