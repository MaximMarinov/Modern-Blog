import { useEffect, useState } from "react";
import * as userService from "../services/userService";
import { auth, db } from "../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "./useAuth";

export const UseUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);
    const { uid } = useAuth();

    const userRef = doc(db, "users", uid);
    
    useEffect(() => {
        setIsLoading(true);
        try {
            onSnapshot(userRef, (snapshot) => {
                setIsLoading(false)
                setCurrentUser(snapshot?.data());
            });
        } catch (error) {
            setHasError(error)
        }
    }, []);

    return {currentUser, isLoading, hasError};
};
