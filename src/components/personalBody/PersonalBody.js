import "./personalbody.scss";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGlobalState } from "../../hooks/useGlobalSate";
import { useNavigate, useLocation } from "react-router-dom";
function PersonalBody(props) {
  const { uInfo } = useGlobalState();
  const navigate = useNavigate();
  const location = useLocation();
  let uid = decodeURI(location.pathname.slice(3));
  if (uid.includes("/saved")) uid = uid.slice(0, -6);
  const [active, setActive] = useState({
    baiviet: props.mucMot ? true : false,
    daluu: props.mucHai ? true : false,
  });
  const styled = { borderTop: "0.5px solid rgb(0,0,0)" };

  return (
    <>
      <div className="personalBody">
        <div className="danhMucs">
          <li
            className="danhmuc"
            style={active.baiviet ? styled : {}}
            onClick={() => {
              setActive({ baiviet: true, daluu: false });
            }}
          >
            <Link to={`/u/${uid}`}>
              <AppsOutlinedIcon
                style={{ fontSize: "13px", marginRight: "8px" }}
              />
              Bai viet
            </Link>
          </li>
          {uid === uInfo?.uid && (
            <li
              className="danhmuc"
              style={active.daluu ? styled : {}}
              onClick={() => {
                setActive({ baiviet: false, daluu: true });
              }}
            >
              <Link to={`/u/${uid}/saved`}>
                <BookmarkBorderOutlinedIcon
                  style={{ fontSize: "13px", marginRight: "8px" }}
                />
                Da luu
              </Link>
            </li>
          )}
        </div>
        <div className="baiViets">
          {props?.posts?.map((ele) => (
            <div
              className="baiviet"
              key={ele?.postId}
              onClick={() => {
                navigate(`/post/${ele?.postId}`);
              }}
            >
              <img src={ele?.photoUrl} alt="" className="baivietImg" />
              <div className="overlay"></div>
              <div className="heartAndComment" style={{ color: "white" }}>
                <FavoriteBorderOutlinedIcon />
                <span>3</span>
                <ChatOutlinedIcon style={{ marginLeft: "15px" }} />
                <span>7</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PersonalBody;
