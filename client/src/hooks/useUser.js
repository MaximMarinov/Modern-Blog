import { useEffect, useState } from "react";
import * as userService from "../services/userService";
import { db } from "../firebase-config";
import { doc } from "firebase/firestore";

export const UseUser = (userId) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);

    const userRef = doc(db, 'users', userId);

    useEffect(() => {
        setIsLoading(true);
        userService.getUser(userRef).then((doc) => {
            setIsLoading(false)
            setData(doc)
        });
    }, [userId]);

    return data;
};
