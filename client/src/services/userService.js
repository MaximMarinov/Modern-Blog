import {
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    setDoc,
    collection,
    arrayUnion,
    FieldValue,
    arrayRemove,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

//
export const getUsers = async (collectionRef) => {
    const response = await getDocs(collectionRef);

    return response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getUser = async () => {
    const currentUser = auth.currentUser;

    const uid = currentUser?.uid;

    const userRef = doc(db, "users", uid);

    const response = await getDoc(userRef);

    return response.data();
};

export const registerUser = (data) => {
    const currentUser = auth.currentUser;

    const uid = currentUser?.uid;

    const docRef = doc(db, "users", uid);

    return setDoc(docRef, data);
};

export const updateUser = async (data) => {
    const currentUser = auth.currentUser;

    const uid = currentUser?.uid;
    const docRef = doc(db, "users", uid);

    await updateDoc(docRef, data);
};

export const addPostToUser = async (data) => {
    const currentUser = auth.currentUser;

    const uid = currentUser?.uid;
    const docRef = doc(db, "users", uid);

    await updateDoc(docRef, {
        posts: arrayUnion(data),
    });
};

export const deletePostUser = async (data) => {
    const currentUser = auth.currentUser;

    const uid = currentUser?.uid;
    const docRef = doc(db, "users", uid);

    await updateDoc(docRef, {
        posts: arrayRemove(data),
    });
};

