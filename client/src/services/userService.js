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
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

const currentUser = auth.currentUser;

const uid = currentUser?.uid;

const docRef = doc(db, "users", uid);
// 
export const getUsers = async (collectionRef) => {
    const response = await getDocs(collectionRef);

    return response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getUser = async (userRef) => {
    const response = await getDoc(userRef);

    return response.data();
};

export const registerUser = (data) => {
    return setDoc(docRef, data);
};

export const updateUser = async (data) => {
    await updateDoc(docRef, data);
};

export const addPostToUser = async (data) => {
    await updateDoc(docRef, {
        posts: arrayUnion(data),
    });
}

// export const deletePost = async (postRef) => {
//     await deleteDoc(postRef);
// };
