// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-fz8mZTsBK4eJuxjQpQg3dAnsWn913BA",
  authDomain: "react-project-3-53d6b.firebaseapp.com",
  projectId: "react-project-3-53d6b",
  storageBucket: "react-project-3-53d6b.appspot.com",
  messagingSenderId: "441664199176",
  appId: "1:441664199176:web:0121169dde3e02f5298fbd"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)