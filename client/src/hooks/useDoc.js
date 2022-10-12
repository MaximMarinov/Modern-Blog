import { useEffect, useState } from "react";
import * as postService from "../services/postsService";
import { db } from "../firebase-config";
import { doc } from "firebase/firestore";

export const UseDoc = (collectionPath, postId) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [data, setData] = useState([]);

    const postRef = doc(db, collectionPath, postId);

    useEffect(() => {
        setIsLoading(true);
        try {
            postService.getPost(postRef).then((doc) => {
                setIsLoading(false)
                setData(doc)
            });
        } catch (error) {
            setHasError(error)
        }
        
    }, [collectionPath, postId]);

    return {data, isLoading, hasError};
};
