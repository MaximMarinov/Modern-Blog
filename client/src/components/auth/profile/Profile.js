import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase-config";
import { useAuth } from "../../../hooks/useAuth";
import { UseDoc } from "../../../hooks/useDoc";
import { UseUser } from "../../../hooks/useUser";
import * as userService from "../../../services/userService";
export const Profile = () => {
    const { uid } = useAuth();

    const currentUser = UseUser(uid)

    return (
        <>
            <img src={currentUser.profilePicUrl} alt="" />
            <h1>Hi, {currentUser.name}</h1>
            <h2>Email: {currentUser.email}</h2>
        </>
    );
};
