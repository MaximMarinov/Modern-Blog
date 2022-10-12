import { useEffect, useState } from "react";
import * as postService from '../services/postsService'
import { collection } from "firebase/firestore";
import { db } from "../firebase-config"

export const UseCollection = (collectionPath) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [data, setData] = useState([]);

    const collectionRef = collection(db, collectionPath);

    useEffect(() => {
        setIsLoading(true);
        try {
            postService
            .getPosts(collectionRef)
            .then((collection) => {
                setIsLoading(false)
                setData(collection)
            });
        } catch (error) {
            setHasError(true)
        }
        
    }, [collectionPath]);

    return {data, isLoading, hasError}
};
