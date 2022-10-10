import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import { UseUser } from "../hooks/useUser";
import * as userService from "../services/userService";
import { doc } from "firebase/firestore";
import { useLocalStorage } from "../hooks/useLocalStorage";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('auth', {});
    const uid = user?.uid
    // const [userDoc, setUserDoc] = useState({});

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        localStorage.clear()
        return signOut(auth);
    };

    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // userService.getUser(doc(db, 'users', user.uid)).then(user => {
        //     setUserDoc(user)
        // })
        return () => {
            unsubscribe();
        };
    }, []);

    

    return (
        <AuthContext.Provider value={{user, uid, logout, signIn, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};
