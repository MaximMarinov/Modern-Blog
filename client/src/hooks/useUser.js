import { useEffect, useState } from "react";
import * as userService from "../services/userService";
import { auth, db } from "../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "./useAuth";

export const UseUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [data, setData] = useState([]);
    const { uid } = useAuth();

    const userRef = doc(db, "users", uid);
    
    useEffect(() => {
        setIsLoading(true);
        try {
            onSnapshot(userRef, (snapshot) => {
                setIsLoading(false)
                setData(snapshot?.data());
            });
        } catch (error) {
            setHasError(error)
        }
    }, []);

    return {data, isLoading, hasError};
};
