import { useEffect, useState } from "react";
import { readDocument, formatDate } from "../../firebase/service";
import "./comment.scss";

function Comment({ commentId, forSingle }) {
  const [cmtInfo, setcmtInfo] = useState();
  const [cmtEr, setcmtEr] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const cmt = await readDocument("comment", commentId);
      const cmter = await readDocument("user", cmt.commentUserId);
      setcmtInfo(cmt);
      setcmtEr(cmter);
    };
    fetchData();
  }, [commentId]);

  return (
    <div className="orionmo">
      {forSingle && (
        <img className="cmterAvatar" alt="" src={cmtEr?.photoURL} />
      )}
      <span className="cmterName">{cmtEr?.displayName}</span>
      {forSingle && (
        <span className="cmttimelay">
          {formatDate(cmtInfo?.createdAt?.seconds) || "vua xong"}
        </span>
      )}
      <span className="cmtContent">{cmtInfo?.commentContent}</span>
    </div>
  );
}

export default Comment;
