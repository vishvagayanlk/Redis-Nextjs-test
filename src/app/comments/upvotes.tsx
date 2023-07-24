'use client'

import axios from "axios";
import react, { useEffect, useState } from "react";

const UpVotes = ({commentId, currentVote }: {commentId: string, currentVote: number}) => {
    const [vote, setVote] = useState<number>(currentVote);
    const upVote = async () => {
        try {
            const {data: {recentVote }, status} = await axios.post("/api/upvote", {
              commentId,
            });
      
            if (status !== 200) return;
            setVote(recentVote);
          } catch (error) {
            console.error("Error while upvoting:", error);
          }
    }

      return (<div>
        <button onClick={upVote}>UpvOTE: {vote}</button>
      </div>)
}
export default UpVotes;