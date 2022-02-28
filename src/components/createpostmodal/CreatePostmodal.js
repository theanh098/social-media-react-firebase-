import "./createpostmodal.scss";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { closeCreatePostModal } from "../../store/action";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../store/AppProvider";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { addDocument } from "../../firebase/service";
import { useGlobalState } from "../../hooks/useGlobalSate";
import { useNavigate } from "react-router-dom";
import Spin from "../spin/Spin";
function CreatePostmodal() {
  const { dispatch } = useContext(Context);
  const [img, setImg] = useState();
  const [urlReview, seturlReview] = useState(null);

  const { uInfo } = useGlobalState();
  const descRef = useRef();
  const navigate = useNavigate();
  const [spin, setSpin] = useState(false);
  useEffect(() => {
    // clean up
    return () => {
      if (urlReview) URL.revokeObjectURL(urlReview);
    };
  }, [urlReview]);
  const handleSubmit = async () => {
    if (img) {
      setSpin(true);
      const postImagesRef = ref(
        storage,
        `images/posts/${img.name.replace(/\s+/g, "")}`
      );
      await uploadBytes(postImagesRef, img);
      const url = await getDownloadURL(
        ref(storage, `images/posts/${img.name.replace(/\s+/g, "")}`)
      );
      const postId = `${uInfo.displayName}||poster${Date.now().toString()}`;
      console.log(postId, url);
      addDocument(
        "post",
        {
          postId,
          author: uInfo.uid,
          des: descRef.current.value,
          photoUrl: url,
          Likes: 0,
          comments: [],
        },
        postId
      );
      dispatch(closeCreatePostModal());
      navigate("/");
    }
  };
  return (
    <div className="createPmodalContainer">
      <CloseOutlinedIcon
        className="cmpcloseBtn"
        onClick={() => {
          dispatch(closeCreatePostModal());
        }}
      />
      <div className="cpmOverlay"></div>
      <div className="cpm">
        <div className="cpmHeader">Tao moi bai viet</div>
        <div className="cpmBody">
          <div className="cpmImg">
            {img && <img className="posterphoto" src={urlReview} alt="" />}
            <PhotoLibraryOutlinedIcon
              style={{
                fontSize: "100px",
              }}
            />
            <div style={{ fontSize: "20px", margin: "20px 0" }}>
              Keo tha anh vao day
            </div>
            <div className="postfileInputgg">
              <input
                type="file"
                name="file"
                id="file"
                className="omicron"
                onChange={(e) => {
                  setImg(e.target.files[0]);
                  seturlReview(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <label htmlFor="file" className="omicronOzon">
                Chon tu thiet bi
              </label>
            </div>
          </div>
          <div className="cpmContent">
            <div className="posterInfo">
              <img
                src="/assets/person/1.png"
                alt=""
                className="posterInfoimg"
              />
              <span style={{ fontSize: "18px", marginLeft: "10px" }}>
                Your name
              </span>
            </div>
            <div className="postChuthich">
              <textarea
                placeholder="vietchuthich"
                className="chuthichInput"
                cols="20"
                rows="10"
                ref={descRef}
              ></textarea>
            </div>
            <div className="postway">
              <EmojiEmotionsOutlinedIcon
                style={{ marginLeft: "15px", fontSize: "30px" }}
              />
              <div
                className="dangbaiBtn"
                style={{
                  cursor: "pointer",
                  marginRight: "15px",
                  color: "#1EA1F7",
                }}
                onClick={handleSubmit}
              >
                {spin ? <Spin /> : "Chia se ngay"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePostmodal;
