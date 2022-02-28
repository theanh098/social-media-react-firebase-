import "./singlepost.scss";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import { useGlobalState } from "../../hooks/useGlobalSate";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  readDocument,
  addDocument,
  updateDocument,
} from "../../firebase/service";
import { listenFirestore } from "../../firebase/listenRealtime";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Comment from "../posts/Comment";

function SinglePost() {
  const { uInfo } = useGlobalState();
  const navigate = useNavigate();
  const { state } = useGlobalState();
  const location = useLocation();
  const [post, setPost] = useState();
  const [author, setAuthor] = useState();
  const [comments, setComments] = useState();
  const cmRef = useRef();
  useEffect(() => {
    document.body.style.overflow = state ? "hidden" : "unset";
    // cleanup
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [state]);
  const postid = decodeURI(location.pathname.slice(6));
  useEffect(() => {
    const fetchData = async () => {
      const po = await readDocument("post", postid);
      const au = await readDocument("user", po.author);
      setPost(po);
      setAuthor(au);
    };
    return fetchData();
  }, [postid]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "post", postid), (doc) => {
      const cmts = doc.data().comments;
      setComments(cmts);
    });
    return unsub;
  }, [postid]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const commentId = `${uInfo.displayName}||comment${Date.now().toString()}`;
    addDocument(
      "comment",
      {
        commentId,
        commentUserId: uInfo.uid,
        commentPostId: postid,
        commentContent: cmRef.current.value,
      },
      commentId
    );
    updateDocument("post", postid, {
      comments: [...post.comments, commentId],
    });
  };
  return (
    <div className="singlePostContainer">
      <CloseOutlinedIcon
        className="closeBtn"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="singlepostOverlay"></div>
      <div className="singlePost">
        <div className="singlePostLeft">
          <img src={post?.photoUrl} alt="" className="postPhoto" />
        </div>
        <div className="singlePostRight">
          <div className="sPRTop">
            <img src={author?.photoURL} alt="" className="sPRTopImg" />
            <div>{author?.displayName}</div>
            <div>Dang theo doi</div>
          </div>
          <div className="sPRCenter">
            {comments?.map((ele) => (
              <Comment commentId={ele} forSingle key={ele} />
            ))}
          </div>
          <div className="sPRBot">
            <div className="sPRBotIcons">
              <FavoriteBorderOutlinedIcon className="sprbIcon" />
              <ChatBubbleOutlineOutlinedIcon className="sprbIcon" />
              <BookmarkBorderOutlinedIcon
                className="sprbIcon"
                style={{ marginLeft: "360px" }}
              />
            </div>
            <div
              style={{
                fontWeight: "600",
                marginBottom: "8px",
                marginLeft: "10px",
              }}
            >
              34 luot thich
            </div>
            <div
              style={{
                color: "rgb(142,142,142)",
                fontSize: "13px",
                marginLeft: "10px",
              }}
            >
              2 weeks ago
            </div>
          </div>
          <div className="formCommentSG">
            <form className="SGformComment" onSubmit={handleSubmit}>
              <div className="SGfcLeft">
                <EmojiEmotionsOutlinedIcon style={{ fontSize: "32px" }} />
                <input
                  placeholder="Them binh luan"
                  className="fcInput"
                  ref={cmRef}
                />
              </div>
              <button className="fcBtn" type="submit">
                Dang
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
