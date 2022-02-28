import "./posts.scss";
import Post from "./Post";
import { query, orderBy, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useState, useEffect } from "react";
import { listenFirestore } from "../../firebase/listenRealtime";
function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "post"), orderBy("createdAt"));
    const unsub = listenFirestore(q, setPosts, "reverse");
    return unsub;
  }, []);

  return (
    <div className="postsContainer">
      {posts.reverse().map((post, index) => (
        <Post info={post} key={index} />
      ))}
    </div>
  );
}

export default Posts;
