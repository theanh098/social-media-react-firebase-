import "./post.scss";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../hooks/useGlobalSate";

import { formatDate } from "../../firebase/service";
import { useEffect, useRef, useState } from "react";
import {
  readDocument,
  addDocument,
  updateDocument,
} from "../../firebase/service";

function Post({ info }) {
  const { uInfo } = useGlobalState();
  const [author, setAuthor] = useState();
  const navigate = useNavigate();
  const commentRef = useRef();
  const [isFollow, setisFollow] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const author = await readDocument("user", info.author);
      const isFl = author?.follower.some((ele) => {
        return ele === uInfo.uid;
      });
      setAuthor(author);
      setisFollow(isFl);
    };
    fetchData();
  }, [info.author, info.comments, uInfo.uid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentId = `${uInfo.displayName}||comment${Date.now().toString()}`;
    addDocument(
      "comment",
      {
        commentId,
        commentUserId: uInfo.uid,
        commentPostId: info.postId,
        commentContent: commentRef.current.value,
      },
      commentId
    );
    updateDocument("post", info.postId, {
      comments: [...info.comments, commentId],
    });
  };
  const followHandle = () => {
    if (author) {
      updateDocument("user", info.author, {
        follower: [...author.follower, uInfo.uid],
      });
      updateDocument("user", uInfo.uid, {
        followin: [...uInfo.followin, author.uid],
      });
      setisFollow(true);
    }
  };
  const unfollowHandle = () => {
    if (author) {
      updateDocument("user", info.author, {
        follower: author.follower.filter((ele) => {
          return ele !== uInfo.uid;
        }),
      });
      updateDocument("user", uInfo.uid, {
        followin: uInfo.followin.filter((ele) => {
          return ele !== author.uid;
        }),
      });
      setisFollow(false);
    }
  };
  console.log(isFollow);
  return (
    <>
      <div className="postContainer">
        <div className="postTop">
          <img
            className="postUserPhoto"
            src={author?.photoURL}
            alt=""
            onClick={() => {
              navigate(`/u/${author?.uid}`);
            }}
          ></img>
          <div className="postUsername">{author?.displayName}</div>
          {uInfo?.uid === author?.uid ? null : !isFollow ? (
            <div className="flspan" onClick={followHandle}>
              theo doi
            </div>
          ) : (
            <div className="flspan" onClick={unfollowHandle}>
              dang theo doi
            </div>
          )}
          <MoreHorizIcon className="menuPostIcon" />
        </div>
        <div className="postbody">
          <img className="postImg" src={info?.photoUrl} alt=""></img>
          <div style={{ marginTop: "8px", marginBottom: "8px" }}>
            <FavoriteBorderOutlinedIcon
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <ChatBubbleOutlineOutlinedIcon
              style={{ marginLeft: "15px", cursor: "pointer" }}
              onClick={() => {
                commentRef.current.focus();
              }}
            />
            <BookmarkBorderOutlinedIcon style={{ marginLeft: "500px" }} />
          </div>
        </div>
        <div className="postContent">
          <div style={{ marginBottom: "8px" }}>160 luot thich</div>
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontWeight: "700", fontSize: "17px" }}>
              {author?.displayName}
            </span>
            <span style={{ marginLeft: "8px" }}>{info?.des}</span>
          </div>
          <div style={{ maxHeight: "100px", overflow: "hidden" }}>
            {info?.comments
              ?.map((cmtId) => <Comment key={cmtId} commentId={cmtId} />)
              .reverse()}
          </div>
          <div
            style={{
              color: "rgb(142,142,142)",
              fontSize: "15px",
              marginBottom: "8px",
            }}
            onClick={() => {
              navigate(`/post/${info?.postId}`);
            }}
          >
            <div style={{ cursor: "pointer" }}>Xem tat ca binh luan</div>
          </div>
          <div
            style={{
              color: "rgb(142,142,142)",
              fontSize: "13px",
              marginBottom: "8px",
            }}
          >
            {formatDate(info?.createdAt?.seconds)}
          </div>
        </div>
        <div className="postComment">
          <form className="commentForm" onSubmit={handleSubmit}>
            <div className="commentFormLeft">
              <EmojiEmotionsOutlinedIcon style={{ fontSize: "24px" }} />
              <input
                placeholder="Them binh luan"
                className="commentInput"
                ref={commentRef}
              />
            </div>
            <button className="commentButton" type="submit">
              Dang
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Post;
