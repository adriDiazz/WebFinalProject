import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBWynDrdII1B3gGVPoPYVFRTsoWeHuhkM8",
    authDomain: "webfinalproject-a3692.firebaseapp.com",
    projectId: "webfinalproject-a3692",
    storageBucket: "webfinalproject-a3692.appspot.com",
    messagingSenderId: "629889985546",
    appId: "1:629889985546:web:2f2b9cf0f3ca10c0ab43f3",
    databaseURL: "https://webfinalproject-a3692-default-rtdb.europe-west1.firebasedatabase.app/"
  };


const app = initializeApp(firebaseConfig);

//export const db = getDatabase(app);
export const auth = getAuth(app);
//export const db = getFirestore(app);
export const db = getDatabase(app);
export default app;
