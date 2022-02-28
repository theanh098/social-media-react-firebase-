import "./personalpage.scss";
import Topbar from "../../components/topbar/Topbar";
import PersonalHeader from "../../components/personalHeader/PersonalHeader";
import PersonalBody from "../../components/personalBody/PersonalBody";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDocument } from "../../firebase/service";

function PersonalPage(props) {
  const location = useLocation();
  const [po, setPo] = useState();
  let uid = decodeURI(location.pathname.slice(3));
  if (uid.includes("/saved")) uid = uid.slice(0, -6);
  console.log(uid);
  const [user, setUser] = useState();
  useEffect(() => {
    const q = query(
      collection(db, "post"),
      where("author", "==", uid),
      orderBy("createdAt")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const datas = snapshot.docs.map((doc) => doc.data()).reverse();
      setPo(datas);
    });
    return unsub;
  }, [uid]);
  useEffect(() => {
    const fetchData = async () => {
      const u = await readDocument("user", uid);
      setUser(u);
    };
    fetchData();
  }, [uid]);
  return (
    <div>
      <Topbar />
      <div className="PersonalPageBody">
        <PersonalHeader user={user} />
        {props.baiviet && <PersonalBody mucMot posts={po} />}
        {props.daluu && <PersonalBody mucHai posts={po} />}
      </div>
    </div>
  );
}

export default PersonalPage;
