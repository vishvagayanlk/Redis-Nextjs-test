import { redis } from "@/lib/redis";
import { nanoid } from "nanoid";
import { NextResponse, type NextRequest } from "next/server";

export const POST = async (req: NextRequest)=> {
    try {
        const {commentId} = await req.json();
        console.log(commentId)
        const result = await redis.json.numincrby(`comment:${commentId}`,'$.upvotes', 1);
        const options = {status: "OK", recentVote: result[0]};
        return NextResponse.json(options)
    } catch (error) { 
        console.log("error", error)
    }
}