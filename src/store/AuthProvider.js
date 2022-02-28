import { auth } from "../firebase/firebase";
import { createContext, useEffect } from "react";
import { useState } from "react";
const Context = createContext();
function AuthProvider(props) {
  const id = localStorage.getItem("userId");
  const [uid, setUid] = useState(id);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("userId", user.uid);
        setUid(user.uid);
        console.log("sign in");
      } else {
        localStorage.clear();
        console.log("sign out");
      }
    });

    return unsub;
  }, []);
  console.log(uid, "render");
  return <Context.Provider value={uid}>{props.children}</Context.Provider>;
}
export { Context, AuthProvider };
