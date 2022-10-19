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

    const override = {
        display: "block",
        margin: "40vh auto 50vh",
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
                            color={"#0032A0"}
                            cssOverride={override}
                            size={200}
                        />
                    ) : (
                        <>
                            {editMode ? (
                                <EditUser editModeToggle={editModeToggle} />
                            ) : (
                                <>
                                    <header
                                        className="header"
                                        style={{
                                            backgroundImage: `url(${currentUser.profilePicUrl})`,
                                            height: `50%`,
                                        }}
                                    >
                                        <div
                                            className="overlay"
                                            style={{
                                                background: `rgba(0, 0, 0, 0.4)`,
                                            }}
                                        >
                                            <h1 className="title">
                                                Hi, {currentUser.name}
                                            </h1>

                                            <button
                                                onClick={editModeToggle}
                                                className={
                                                    styles["button-submit"]
                                                }
                                            >
                                                Edit Profile
                                            </button>
                                        </div>

                                        <div className="shape">
                                            <svg viewBox="0 0 1500 200">
                                                <path d="m 0,240 h 1500.4828 v -71.92164 c 0,0 -286.2763,-81.79324 -743.19024,-81.79324 C 300.37862,86.28512 0,168.07836 0,168.07836 Z" />
                                            </svg>
                                        </div>
                                    </header>

                                    {currentUser.posts ? (
                                        <section
                                            id="service"
                                            className="section pt-0"
                                        >
                                            <div className="container">
                                                <h6 className="section-title text-center">
                                                    My Posts
                                                </h6>

                                                <div className="row">
                                                    {currentUser.posts?.map(
                                                        (post) => {
                                                            return (
                                                                <div
                                                                    className="col-md-4"
                                                                    key={
                                                                        post.id
                                                                    }
                                                                >
                                                                    <Link
                                                                        className="card mb-4 mb-md-0"
                                                                        to={`/posts/${post.collectionVal}/${post.id}`}
                                                                    >
                                                                        <SinglePost
                                                                            post={
                                                                                post
                                                                            }
                                                                        />
                                                                    </Link>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </section>
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
