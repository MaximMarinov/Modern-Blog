import { useEffect, useState } from "react";
import * as postService from "../services/postsService";
import { db } from "../firebase-config";
import { doc } from "firebase/firestore";

export const UseDoc = (collectionPath, postId) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);

    const postRef = doc(db, collectionPath, postId);

    useEffect(() => {
        setIsLoading(true);
        postService.getPost(postRef).then((doc) => {
            setIsLoading(false)
            setData(doc)
        });
    }, [collectionPath, postId]);

    return data;
};
