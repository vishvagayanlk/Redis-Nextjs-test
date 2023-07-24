import { redis } from "@/lib/redis";
import { nanoid } from "nanoid";
import type { NextRequest } from "next/server";

export const POST = async (req: NextRequest)=> {
    try {
        const {text, tags} = await req.json();
        // add commment to list
        const commendId = nanoid();
        const comment = {
            text,
            timestamp: new Date(),
            aurthor: req?.cookies?.get('userId')?.value,
            tags,
            upvotes: 0
        }
        Promise.all([
            redis.rpush('comments', commendId),
            redis.json.set(`comment:${commendId}`, '$', comment)
        ])
        return new Response('OK')
    } catch (error) { 
        console.log("error", error)
    }
}