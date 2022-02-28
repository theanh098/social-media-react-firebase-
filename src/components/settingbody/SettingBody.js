import { useState } from "react";
import "./settingbody.scss";
function SettingBody() {
  const [show, setShow] = useState();
  return (
    <div className="settingContainer">
      <h3>chinh sua trang ca nhan</h3>
      <div className="acinfo">
        <img src="/assets/person/1.png" alt="" className="acphoto" />
        <div>
          <div>displayName</div>
          <div>Thay doi avatar</div>
        </div>
      </div>

      <input className="acname" />
      <div
        onClick={() => {
          setShow(!show);
        }}
      >
        doi mat khau
      </div>
      {show && (
        <form className="passeditform">
          <input />
        </form>
      )}
    </div>
  );
}

export default SettingBody;
