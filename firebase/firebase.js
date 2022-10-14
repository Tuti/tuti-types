// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD7xxTK_k2tegnP11BndgbrQ0uwP3a9coQ",
  authDomain: "tuti-types.firebaseapp.com",
  databaseURL: "https://tuti-types-default-rtdb.firebaseio.com",
  projectId: "tuti-types",
  storageBucket: "tuti-types.appspot.com",
  messagingSenderId: "1049968475116",
  appId: "1:1049968475116:web:11173d1aa8a0af20bc5ec9"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//Firebase Auth
export const auth = getAuth(app);

setPersistence(auth, browserSessionPersistence);
connectAuthEmulator(auth, "http://localhost:9099");
