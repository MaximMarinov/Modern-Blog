import {
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    setDoc,
    collection,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

export const getUsers = async (collectionRef) => {
    const response = await getDocs(collectionRef);

    return response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getUser = async (userRef) => {
    const response = await getDoc(userRef);

    return response.data();
};

export const registerUser = (data) => {
    const currentUser = auth.currentUser;
    const uid = currentUser.uid;
    const docRef = doc(db, 'users', uid)

    return setDoc(docRef, data);
};

export const updateUser = async (userRef, data) => {
    await updateDoc(userRef, data);
};

// export const deletePost = async (postRef) => {
//     await deleteDoc(postRef);
// };
