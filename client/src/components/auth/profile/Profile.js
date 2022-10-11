import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { UseUser } from "../../../hooks/useUser";
import * as postService from "../../../services/postsService";
import { EditUser } from "../edit-user/EditUser";

export const Profile = () => {
    const { uid } = useAuth();
    const currentUser = UseUser(uid);
    const [editMode, setEditMode] = useState();

    const editModeToggle = () => {
        setEditMode(!editMode);
    };

    return (
        <>
            {editMode ? (
                <EditUser editModeToggle={editModeToggle} />
            ) : (
                <>
                    <img src={currentUser.profilePicUrl} alt="" />
                    <h1>Hi, {currentUser.name}</h1>
                    <h2>Email: {currentUser.email}</h2>
                    {currentUser.posts?.length > 0 ? (
                        <p>Posts: {currentUser.posts?.length}</p>
                    ) : null}
                </>
            )}

            <button onClick={editModeToggle}>Edit Profile</button>
        </>
    );
};
