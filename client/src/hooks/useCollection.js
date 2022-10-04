import { useEffect, useState } from "react";
import * as postService from '../services/postsService'
import { collection } from "firebase/firestore";
import { db } from "../firebase-config"

export const UseCollection = (collectionPath) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);

    const collectionRef = collection(db, collectionPath);

    useEffect(() => {
        postService
            .getPosts(collectionRef)
            .then((collection) => setData(collection));
    }, [collectionPath]);

    return data
};
