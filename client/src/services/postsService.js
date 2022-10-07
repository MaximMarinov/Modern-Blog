import {
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

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
