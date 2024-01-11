import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBeOUUe1VVVgeOISH5DXP8vUMHjsHiv88",
  authDomain: "fba---financial-budgetin-9a135.firebaseapp.com",
  projectId: "fba---financial-budgetin-9a135",
  storageBucket: "fba---financial-budgetin-9a135.appspot.com",
  messagingSenderId: "623754968538",
  appId: "1:623754968538:web:d4267003ad8736d24cd4e3",
  measurementId: "G-53J1EWN5J1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
