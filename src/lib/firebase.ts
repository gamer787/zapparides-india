import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB5IEwGc48bGq7RZCvcoC21Idod_S0Ix2Y",
  authDomain: "zappa-rides-user-and-ddriver.firebaseapp.com",
  databaseURL: "https://zappa-rides-user-and-ddriver-default-rtdb.firebaseio.com",
  projectId: "zappa-rides-user-and-ddriver",
  storageBucket: "zappa-rides-user-and-ddriver.appspot.com",
  messagingSenderId: "494881671425",
  appId: "1:494881671425:web:b34d0c779003f2d084f300",
  measurementId: "G-9LZ66BC4YR"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);