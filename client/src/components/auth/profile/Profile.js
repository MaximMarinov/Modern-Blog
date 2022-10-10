import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { UseUser } from "../../../hooks/useUser";

export const Profile = () => {
    const { uid } = useAuth();
    const currentUser = UseUser(uid);

    return (
        <>
            <img src={currentUser.profilePicUrl} alt="" />
            <h1>Hi, {currentUser.name}</h1>
            <h2>Email: {currentUser.email}</h2>
            {currentUser.posts?.length > 0 ? (
                <p>Posts: {currentUser.posts?.length}</p>
            ) : null}
        </>
    );
};
