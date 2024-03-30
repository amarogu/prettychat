import { NextRequest } from "next/server";
import connectDb from "../../../../connect";

export default async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json() as { name: string };
        await connectDb();
        
    } catch (err: any) {

    }
}