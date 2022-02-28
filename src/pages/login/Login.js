import "./login.scss";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../firebase/service";

function Login({ signup }) {
  const emailRef = useRef();
  const passRef = useRef();
  const repassRef = useRef();
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const resetError = () => {
    seterror("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signup)
      signUp(
        emailRef.current.value,
        passRef.current.value,
        repassRef.current.value,
        navigate,
        seterror
      );
    else
      signIn(emailRef.current.value, passRef.current.value, navigate, seterror);
  };

  return (
    <div className="login">
      <div className="loginTop">
        <div className="loginLogo">Hi Guy!</div>
        <form
          className="formLogin"
          onSubmit={handleSubmit}
          style={error ? { paddingBottom: "50px" } : {}}
        >
          <input
            onFocus={resetError}
            className="loginInput"
            placeholder=" email"
            ref={emailRef}
          ></input>
          <input
            className="loginInput"
            placeholder=" mat khau"
            ref={passRef}
            onFocus={resetError}
          ></input>
          {signup && (
            <input
              ref={repassRef}
              className="loginInput"
              placeholder=" xac nhan lai mat khau"
              onFocus={resetError}
            ></input>
          )}
          <button className="loginBtn" type="submit">
            {signup ? "dang ky" : "dang nhap"}
          </button>
        </form>
        {error && <span className="warning">{error}</span>}
      </div>
      <div className="loginBot">
        <span>
          {!signup ? "Ban chua co tai khoan u?" : "Ban da co tai khoan"}
        </span>
        <Link to={signup ? "/login" : "/signup"} onClick={resetError}>
          <span className="lbBtn">{!signup ? "dang ky" : "dang nhap"} </span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
