import { NextRequest } from "next/server";
import connectDb from "../../../../connect";
import User from "../../../../models/User";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json() as { name: string };
        await connectDb();
        const user = await User.findOne({name: reqBody.name});
        if (!user) {
            return Response.json({message: 'This user does not exist.'});
        }
    } catch (err: any) {

    }
}