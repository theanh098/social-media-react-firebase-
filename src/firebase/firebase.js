import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCF4Y80nAh56RcJ2lsenwbUwQjQPgJHdgw",
  authDomain: "social-app-742d2.firebaseapp.com",
  projectId: "social-app-742d2",
  storageBucket: "social-app-742d2.appspot.com",
  messagingSenderId: "1099487444180",
  appId: "1:1099487444180:web:4da46ff995842b1c564f41",
  measurementId: "G-9EETKKCH2W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
// connectAuthEmulator(auth, "http://localhost:9099");

const db = getFirestore();
// connectFirestoreEmulator(db, "localhost", 9005);

const storage = getStorage();
// connectStorageEmulator(storage, "localhost", 9199);

export { auth, db, storage };
