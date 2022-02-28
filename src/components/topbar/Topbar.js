import "./topbar.scss";
import { Search } from "@material-ui/icons";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import AddIcon from "@material-ui/icons/Add";
import AutorenewOutlinedIcon from "@material-ui/icons/AutorenewOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import { useState } from "react";
import { Link } from "react-router-dom";
import CreatePostmodal from "../createpostmodal/CreatePostmodal";
import { useGlobalState } from "../../hooks/useGlobalSate";
import { showCreatePostModal } from "../../store/action";
import { auth, db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import Spin from "../spin/Spin";

export default function Topbar() {
  const [dropDown, setdropDown] = useState(false);
  const { state, dispatch, uInfo } = useGlobalState();
  const [searchResult, setsearchResult] = useState(false);
  const [result, setResult] = useState();
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();
  const clickHandle = () => {
    setdropDown(!dropDown);
  };
  let timeout = null;
  const handleKeyup = (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      setSpin(true);
      console.log("start searching ...");
      const q = query(
        collection(db, "user"),
        where(
          "keywords",
          "array-contains",
          e.target.value.toLowerCase().replace(/\s+/g, "")
        )
      );
      const users = await getDocs(q);
      const rsult = users.docs.map((ele) => ele.data());
      setSpin(false);
      setResult(rsult);
    }, 1000);
  };
  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/">
            <span className="logo">Hi Guy!</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Search"
              className="searchInput"
              onFocus={() => {
                setsearchResult(true);
              }}
              onKeyUp={handleKeyup}
            />
            {spin && <Spin />}
            {searchResult && (
              <div className="SearchResult">
                {result?.map((ele) => (
                  <div
                    className="resultMatched"
                    key={ele?.uid}
                    onClick={(e) => {
                      setsearchResult(false);
                      navigate(`/u/${ele?.uid}`);
                    }}
                  >
                    <img src={ele?.photoURL} alt="" className="matchedimg" />
                    <span style={{ marginLeft: "12px" }}>
                      {ele?.displayName}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <HomeOutlinedIcon />
            </div>
            <div className="topbarIconItem">
              <ChatOutlinedIcon />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <NotificationsNoneOutlinedIcon />
              <span className="topbarIconBadge">1</span>
            </div>
            <div
              className="topbarIconItem"
              onClick={() => {
                dispatch(showCreatePostModal());
              }}
            >
              <AddIcon />
            </div>
          </div>
          <div className="profile">
            <img
              src={uInfo?.photoURL}
              alt=""
              className="topbarImg"
              onClick={clickHandle}
            />
            {dropDown && (
              <div className="dropDown">
                <ul className="dropDownList">
                  <li className="dropDownListItem" onClick={clickHandle}>
                    <Link to={`/u/${uInfo?.uid}`}>
                      <PersonOutlinedIcon className="dropDownIcon" />
                      Trang ca nhan
                    </Link>
                  </li>
                  <li className="dropDownListItem" onClick={clickHandle}>
                    <Link to="/canhan/saved">
                      <BookmarkBorderOutlinedIcon className="dropDownIcon" />
                      Da luu
                    </Link>
                  </li>
                  <li className="dropDownListItem">
                    <SettingsOutlinedIcon className="dropDownIcon" />
                    Cai dat
                  </li>
                  <li className="dropDownListItem">
                    <AutorenewOutlinedIcon className="dropDownIcon" />
                    chuyen tai khoan
                  </li>
                  <Link
                    to="/login"
                    className="dangxuat"
                    onClick={() => {
                      auth.signOut();
                    }}
                  >
                    <li className="cmjk">Dang xuat</li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {state.createpostModal && <CreatePostmodal />}
    </>
  );
}
