import { onSnapshot } from "firebase/firestore";

export const listenFirestore = (queryOrDoc, cb, isReverse) => {
  return onSnapshot(queryOrDoc, (snapshot) => {
    const datas = snapshot.docs.map((doc) => doc.data());

    if (isReverse) cb(datas.reverse());
    else cb(datas);
  });
};
