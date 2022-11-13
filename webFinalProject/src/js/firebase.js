import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBWynDrdII1B3gGVPoPYVFRTsoWeHuhkM8",
    authDomain: "webfinalproject-a3692.firebaseapp.com",
    projectId: "webfinalproject-a3692",
    storageBucket: "webfinalproject-a3692.appspot.com",
    messagingSenderId: "629889985546",
    appId: "1:629889985546:web:2f2b9cf0f3ca10c0ab43f3"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
