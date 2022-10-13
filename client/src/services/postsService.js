import {
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    arrayUnion,
    FieldValue,
    increment,
    documentId,
} from "firebase/firestore";
import { auth } from "../firebase-config";

export const getPosts = async (collectionRef) => {
    const response = await getDocs(collectionRef);

    return response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getPost = async (postRef) => {
    const response = await getDoc(postRef);

    return response.data();
};

export const createPost = async (postCollectionRef, data) => {
    const result = await addDoc(postCollectionRef, data);
    return result;
};

export const editPost = async (postRef, data) => {
    await updateDoc(postRef, data);
};

export const deletePost = async (postRef) => {
    await deleteDoc(postRef);
};

export const addComment = async (postRef, data) => {
    await updateDoc(postRef, {
        comments: arrayUnion(data)
    });
};

export const addPostId = async (postRef, data) => {
    await updateDoc(postRef, data);
}