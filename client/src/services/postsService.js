import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";

export const getPosts = async (collectionRef) => {
    const response = await getDocs(collectionRef);

    return response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getPost = async (postRef) => {
    const response = await getDoc(postRef)
    
    return response.data()
};
