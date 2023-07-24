import { redis } from "@/lib/redis";
import Link from "next/link";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";
import UpVotes from "./upvotes";

const Page = async () => {

    const commentIds: Array<string> = await redis.lrange('comments',0,3);
    const comments: any = await Promise.all(
        commentIds.map(async (commentId: string)=> {
            const details = await redis.json.get(`comment:${commentId}`)
            return {
                ...details,
                commentId
            }
        })
    )
   
    return (
      <div>
        <Link href={"/"}>HomePage</Link>
        {comments?.map((comment: any, index: any) => 
          <div className="flex flex-col gap-2" key={`comment-${index}`}>
            <h1>{comment.aurthor}</h1>
            <p>{comment.text}</p>
            <p>{comment.timestamp}</p>
            <UpVotes commentId={comment.commentId} currentVote={comment.upvotes} />
          </div>
        )}
      </div>
    );
  }
  
  export default Page;