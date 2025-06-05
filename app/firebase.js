import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAwfBeY9Ou8mIoQIGrJKMUD_UaTT4S5YuQ",
  authDomain: "project-fooding.firebaseapp.com",
  projectId: "project-fooding",
  storageBucket: "project-fooding.firebasestorage.app",
  messagingSenderId: "111196203099",
  appId: "1:111196203099:web:c637394f2ff04764cab77e",
  measurementId: "G-BG9JZFQ588",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
