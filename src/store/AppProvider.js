import { createContext, useEffect, useReducer, useState } from "react";
import { reducer, initialState } from "./reducer";
import { useAuth } from "../hooks/useAuth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
const Context = createContext();
function AppProvider(props) {
  const currentUid = useAuth();
  const [uInfo, setuInfo] = useState(currentUid);
  console.log(uInfo);
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "user", currentUid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setuInfo(docSnap.data());
      }
    };
    if (currentUid) fetchData();
  }, [currentUid]);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch, uInfo }}>
      {props.children}
    </Context.Provider>
  );
}

export { Context, AppProvider };
