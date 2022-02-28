import "./personalheader.scss";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
//import { useGlobalState } from "../../hooks/useGlobalSate";
function PersonalHeader({ user }) {
  //const { uInfo } = useGlobalState();

  return (
    <div className="personalHeader">
      <div className="personalImg">
        <img src={user?.photoURL} alt="" className="imgHeader" />
      </div>
      <div className="personalInfo">
        <div className="personalInfoTop">
          <h2>{user?.displayName}</h2>
          <button className="PHbtn">Nhan tin</button>
          <button className="PHbtn">
            <CheckOutlinedIcon style={{ fontSize: "15px" }} />
          </button>
        </div>
        <div className="personalInfoBot">
          <div>30 bai viet</div>
          <div>{user?.follower.length} nguoi theo doi</div>
          <div> dang theo doi {user?.followin.length} nguoi </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalHeader;
