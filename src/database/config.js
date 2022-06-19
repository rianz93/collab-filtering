import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCg3Xk_-RuMwHSJ0QGeNJ5Qe7AE2_oe2uY",
  authDomain: "collab-filtering-ta.firebaseapp.com",
  databaseURL: "https://collab-filtering-ta-default-rtdb.firebaseio.com",
  projectId: "collab-filtering-ta",
  storageBucket: "collab-filtering-ta.appspot.com",
  messagingSenderId: "893207460464",
  appId: "1:893207460464:web:f35d8969fa0ca2137892b5",
  measurementId: "G-HYEJ43K4Z9",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();

const colRef = collection(db, "investor");
export const getData = getDocs(colRef);
export function sendData(data) {
  addDoc(colRef, data).then((result)=>{
    console.log(result);
  });
}
