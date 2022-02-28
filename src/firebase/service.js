import { auth, db } from "./firebase";
import {
  setDoc,
  getDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { formatRelative } from "date-fns";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import generateKeywords from "./generateKeywords";

export const addDocument = async (collectionName, data, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, { ...data, createdAt: serverTimestamp() });
  } catch (error) {
    console.log(error);
  }
};
export const signUp = async (email, pass, repass, SuccessCb, FailCb) => {
  try {
    if (pass === repass) {
      const {
        user: { uid },
      } = await createUserWithEmailAndPassword(auth, email, pass);
      addDocument(
        "user",
        {
          uid,
          email,
          displayName: email.substring(0, email.lastIndexOf("@")),
          photoURL: "http://localhost:3000/assets/person/2.png",
          follower: [],
          followin: [],
          keywords: generateKeywords(
            email.substring(0, email.lastIndexOf("@"))
          ),
        },
        uid
      );
      SuccessCb("/");
    } else {
      FailCb("mat kau xac nhan khong chinh xac");
      pass = repass = "";
    }
  } catch (error) {
    FailCb("email khong hop le");
  }
};
export const signIn = async (email, pass, SuccessCb, FailCb) => {
  try {
    await signInWithEmailAndPassword(auth, email, pass);
    SuccessCb("/");
  } catch (error) {
    FailCb("thong tin khong chinh xac");
  }
};

export const readDocument = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  console.log("No such document!");
  return null;
};
export const updateDocument = async (collectionName, idDoc, newFieldData) => {
  try {
    const docRef = doc(db, collectionName, idDoc);
    await updateDoc(docRef, newFieldData);
  } catch (error) {
    console.log(error);
  }
};

export const formatDate = (seconds) => {
  let formattedDate = "";

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
};
