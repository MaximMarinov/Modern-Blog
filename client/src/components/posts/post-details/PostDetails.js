import { Link, useParams } from "react-router-dom";
import styles from "./assets/css/PostDetails.module.css";
import * as postService from "../../../services/postsService";
import * as userService from "../../../services/userService";
import { useNavigate } from "react-router-dom";
import { UseDoc } from "../../../hooks/useDoc";
import { db } from "../../../firebase-config";
import { doc } from "firebase/firestore";
import { useAuth } from "../../../hooks/useAuth";
import RingLoader from "react-spinners/RingLoader";
import { UseUser } from "../../../hooks/useUser";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export const PostDetails = () => {
    const { collectionPath, postId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { currentPost, isLoading, hasError } = UseDoc(collectionPath, postId);
    const { currentUser } = UseUser();

    const [comment, setComment] = useState("");

    const commentId = uuid();

    const postRef = doc(db, collectionPath, postId);

    const override = {
        display: "block",
        margin: "250px auto 250px",
    };

    const deleteHandler = () => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (confirmation) {
            postService.deletePost(postRef);
            userService.deletePostUser(currentPost);
            navigate(`/posts/${collectionPath}`);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        postService.addComment(postRef, {
            id: commentId,
            content: comment,
            author: currentUser.name,
            authorImg: currentUser.profilePicUrl,
        });

        setComment("");
    };

    return (
        <>
            {hasError ? (
                <img
                    src={require(`../../../images/error-icon.png`)}
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
                        <section className={styles["section-details"]}>
                            <header
                                className="header"
                                style={{
                                    backgroundImage: `url(${currentPost.imageUrl})`,
                                    height: `50%`,
                                }}
                            >
                                <div
                                    className="overlay"
                                    style={{ background: `rgba(0, 0, 0, 0.4)` }}
                                ></div>
                                <div className="shape">
                                    <svg viewBox="0 0 1500 200">
                                        <path d="m 0,240 h 1500.4828 v -71.92164 c 0,0 -286.2763,-81.79324 -743.19024,-81.79324 C 300.37862,86.28512 0,168.07836 0,168.07836 Z" />
                                    </svg>
                                </div>
                            </header>

                            <div className="shell">
                                <div className={styles["section__content"]}>
                                    <h1>{currentPost.title}</h1>

                                    <p>{currentPost.content}</p>

                                    <i>{currentPost.author}</i>

                                    <h1>Comments</h1>
                                    <ul>
                                        {currentPost?.comments?.map((c) => {
                                            return (
                                                <li key={c.id}>
                                                    <p>
                                                        {c.content} -{" "}
                                                        <strong>
                                                            {c.author}
                                                        </strong>
                                                    </p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                {user ? (
                                    <>
                                        <div className={styles["form-box"]}>
                                            <form
                                                action="POST"
                                                className={styles["form"]}
                                                onSubmit={submitHandler}
                                            >
                                                <label
                                                    className={
                                                        styles["form__label"]
                                                    }
                                                    htmlFor="comment"
                                                >
                                                    Add Comment
                                                </label>
                                                <div
                                                    className={styles["field"]}
                                                >
                                                    <input
                                                        id="comment"
                                                        type="text"
                                                        name="comment"
                                                        onChange={(e) =>
                                                            setComment(
                                                                e.target.value
                                                            )
                                                        }
                                                        value={comment}
                                                        required
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        styles["form__actions"]
                                                    }
                                                >
                                                    <input type="submit" />
                                                </div>
                                            </form>
                                        </div>
                                    </>
                                ) : null}

                                {user?.uid == currentPost.ownerId ? (
                                    <div className={styles["section__actions"]}>
                                        <Link
                                            className="button"
                                            to={`/edit/${collectionPath}/${postId}`}
                                        >
                                            Edit
                                        </Link>
                                        <a
                                            className="button delete"
                                            onClick={deleteHandler}
                                        >
                                            Delete
                                        </a>
                                    </div>
                                ) : null}
                            </div>
                        </section>
                    )}
                </>
            )}
        </>
    );
};
