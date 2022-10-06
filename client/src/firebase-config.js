import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAMF0yKhhP8PWnPL8hU0CoQpX-0q63rmaw",
    authDomain: "modern-4c99f.firebaseapp.com",
    projectId: "modern-4c99f",
    storageBucket: "modern-4c99f.appspot.com",
    messagingSenderId: "322185646840",
    appId: "1:322185646840:web:9b7762bf40df6bc06f610d",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
