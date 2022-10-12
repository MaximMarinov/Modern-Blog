import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { UseUser } from "../../../hooks/useUser";
import * as postService from "../../../services/postsService";
import { EditUser } from "../edit-user/EditUser";
import RingLoader from "react-spinners/RingLoader";

export const Profile = () => {
    const { data, isLoading, hasError } = UseUser();
    const [editMode, setEditMode] = useState();

    const editModeToggle = () => {
        setEditMode(!editMode);
    };

    return (
        <>
            {hasError ? (
                <img
                    src={require("../../../images/error-icon.png")}
                    alt="error"
                />
            ) : (
                <>
                    {isLoading ? (
                        <RingLoader
                            color={"#ffde59"}
                            loading={isLoading}
                            size={150}
                        />
                    ) : (
                        <>
                            {editMode ? (
                                <EditUser editModeToggle={editModeToggle} />
                            ) : (
                                <>
                                    <img src={data.profilePicUrl} alt="" />
                                    <h1>Hi, {data.name}</h1>
                                    <h2>Email: {data.email}</h2>
                                    {data.posts?.length > 0 ? (
                                        <p>Posts: {data.posts?.length}</p>
                                    ) : null}
                                    <button onClick={editModeToggle}>
                                        Edit Profile
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
};
