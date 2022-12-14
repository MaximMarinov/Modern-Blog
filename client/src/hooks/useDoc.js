import { useEffect, useState } from "react";
import * as postService from "../services/postsService";
import { db } from "../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";

export const UseDoc = (collectionPath, postId) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [currentPost, setCurrentPost] = useState([]);

    const postRef = doc(db, collectionPath, postId);

    useEffect(() => {
        setIsLoading(true);
        try {
            onSnapshot(postRef, (snapshot) => {
                setIsLoading(false)
                setCurrentPost(snapshot?.data());
            });
        } catch (error) {
            setHasError(error)
        }
        
    }, [collectionPath, postId]);

    return {currentPost, isLoading, hasError};
};
