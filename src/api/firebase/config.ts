import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getAuth } from "firebase/auth";
import * as firebaseAuth from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBeOUUe1VVVgeOISH5DXP8vUMHjsHiv88",
  authDomain: "fba---financial-budgetin-9a135.firebaseapp.com",
  projectId: "fba---financial-budgetin-9a135",
  storageBucket: "fba---financial-budgetin-9a135.appspot.com",
  messagingSenderId: "623754968538",
  appId: "1:623754968538:web:d4267003ad8736d24cd4e3",
  measurementId: "G-53J1EWN5J1",
};

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
const app = initializeApp(firebaseConfig);
export const initAuth = initializeAuth(app, {
  persistence: reactNativePersistence(AsyncStorage),
});
export const auth = getAuth(app);
export const firestore = getFirestore(app);
