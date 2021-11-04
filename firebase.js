// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage}   from "firebase/storage"  


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDf233i3mTiHYOqLcJpAK2a8tDcfhr9Gio",
  authDomain: "firedene.firebaseapp.com",
  databaseURL: "https://firedene.firebaseio.com",
  projectId: "firedene",
  storageBucket: "firedene.appspot.com",
  messagingSenderId: "488387222228",
  appId: "1:488387222228:web:87590487a30c500bcaf941"
};

// Initialize Firebase
const app       = !getApps().length? initializeApp(firebaseConfig):getApp();
const db        = getFirestore();
const storage   = getStorage();

export {app, db, storage };