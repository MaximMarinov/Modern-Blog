import { useState } from "react";
import { UseUser } from "../../../hooks/useUser";
import { EditUser } from "../edit-user/EditUser";
import RingLoader from "react-spinners/RingLoader";
import { SinglePost } from "../../posts/single-post/SinglePost";
import styles from "./assets/css/Profile.module.css";
import { Link } from "react-router-dom";

export const Profile = () => {
    const { currentUser, isLoading, hasError } = UseUser();
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
                                    <img
                                        src={currentUser.profilePicUrl}
                                        alt=""
                                    />

                                    <h1>Hi, {currentUser.name}</h1>

                                    <h2>Email: {currentUser.email}</h2>

                                    <button onClick={editModeToggle}>
                                        Edit Profile
                                    </button>

                                    {currentUser.posts ? (
                                        <div className="shell">
                                            <ul className={styles["post-list"]}>
                                                {currentUser.posts?.map(
                                                    (post) => {
                                                        return (
                                                            <Link
                                                                to={`/posts/${post.collectionVal}/${post.id}`}
                                                                key={post.id}
                                                                className={
                                                                    styles[
                                                                        "post"
                                                                    ]
                                                                }
                                                            >
                                                                <SinglePost
                                                                    post={post}
                                                                />
                                                            </Link>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        </div>
                                    ) : null}
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
};
