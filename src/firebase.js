import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getDatabase } from "firebase/database";

const app = firebase.initializeApp({
  apiKey: "AIzaSyB-P0SaDoCTG6QBw-nb6X07h6CLRFkjzaw",
  authDomain: "map-project-1e5b7.firebaseapp.com",
  databaseURL: "https://map-project-1e5b7-default-rtdb.firebaseio.com",
  projectId: "map-project-1e5b7",
  storageBucket: "map-project-1e5b7.appspot.com",
  messagingSenderId: "73374497044",
  appId: "1:73374497044:web:c2477e14da47e0d1c0aa01",
});

export const auth = app.auth();
export default app;
const database = getDatabase();

export { database };
