import {
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    setDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";

export const getUsers = async (collectionRef) => {
    const response = await getDocs(collectionRef);

    return response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getUser = async (postRef) => {
    const response = await getDoc(postRef);

    return response.data();
};

export const registerUser = async (user, data) => {
    if (!user) {
        return;
    }

    db.collection("users").doc(user).set({
        data,
    });
};

// export const editPost = async (postRef, data) => {
//     await updateDoc(postRef, data);
// };

// export const deletePost = async (postRef) => {
//     await deleteDoc(postRef);
// };
