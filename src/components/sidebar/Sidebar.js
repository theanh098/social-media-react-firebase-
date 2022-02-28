import "./sidebar.scss";
import { useGlobalState } from "../../hooks/useGlobalSate";
export default function Sidebar() {
  const { uInfo } = useGlobalState();
  console.log(uInfo);
  return (
    <div className="sidebarContainer">
      <div className="userCurrent">
        <img className="userPhoto" src={uInfo?.photoURL} alt=""></img>
        <span className="username">{uInfo?.displayName}</span>
        <div className="switch">Chuyen</div>
      </div>
      <div className="recommendArea">
        <span style={{ color: "rgb(143,143,143)" }}>Goi y cho ban</span>

        <div className="recommendUser">
          <img className="avatar" src="/assets/person/1.png" alt=""></img>
          <div className="recommendInfo">
            <span style={{ fontSize: "15px" }}>its name</span>
            <span
              style={{
                display: "block",
                color: "rgb(187,156,142)",
                fontSize: "12px",
              }}
            >
              Goi y cho ban
            </span>
          </div>
          <div className="follow">Theo doi</div>
        </div>
      </div>
    </div>
  );
}
