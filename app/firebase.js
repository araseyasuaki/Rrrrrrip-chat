import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, setDoc, doc, collection, getDoc, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBmlMG-1BtjC1EZM28ONhCr_b_raDuM2Z0",
  authDomain: "chat-app-a155e.firebaseapp.com",
  projectId: "chat-app-a155e",
  storageBucket: "chat-app-a155e.appspot.com",
  messagingSenderId: "208027180606",
  appId: "1:208027180606:web:53f997f7a8266b41533b6f"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, googleProvider, signInWithPopup, signOut, db, storage, setDoc, doc, collection, getDoc, getDocs, addDoc, getAuth, updateDoc, ref, uploadBytes, getDownloadURL };
