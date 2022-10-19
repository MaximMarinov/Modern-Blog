import styles from "./assets/css/EditPost.module.css";
import { useState } from "react";
import { db } from "../../../firebase-config";
import { doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import * as postService from "../../../services/postsService";
import { useNavigate } from "react-router-dom";
import { UseDoc } from "../../../hooks/useDoc";
import editImage from "./assets/images/edit.jpg";

export const EditPost = () => {
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const [imageUrlError, setImageUrlError] = useState("");

    const { collectionPath, postId } = useParams();

    const navigate = useNavigate();

    const { currentPost } = UseDoc(collectionPath, postId);

    const postRef = doc(db, collectionPath, postId);

    const validateTitle = () => {
        if (currentPost.title.lenght < 5) {
            setTitleError(true);
        } else {
            setTitleError(false);
        }
    };

    const validateContent = () => {
        if (currentPost.content.lenght < 20) {
            setContentError(true);
        } else {
            setContentError(false);
        }
    };

    const validateImageUrl = () => {
        const pattern =
            /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|webp|avif|gif|svg)/;
        if (pattern.test(currentPost.imageUrl)) {
            setImageUrlError(false);
        } else {
            setImageUrlError(true);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const gameData = Object.fromEntries(new FormData(e.target));

        postService.editPost(postRef, { ...gameData });

        return navigate(`/posts/${collectionPath}`);
    };

    return (
        <div className="shell">
            <header
                className="header"
                style={{
                    height: `50%`,
                    background: `url(${editImage})`,
                }}
            >
                <div
                    className="overlay"
                    style={{ background: `rgba(0, 0, 0, 0.3)` }}
                >
                    <h1 className="title">Edit Post</h1>
                </div>
                <div className="shape">
                    <svg viewBox="0 0 1500 200">
                        <path d="m 0,240 h 1500.4828 v -71.92164 c 0,0 -286.2763,-81.79324 -743.19024,-81.79324 C 300.37862,86.28512 0,168.07836 0,168.07836 Z" />
                    </svg>
                </div>
            </header>
            <div className="container">
                <div className={styles["form-box"]}>
                    <form
                        action="PUT"
                        className={styles["form"]}
                        onSubmit={submitHandler}
                    >
                        <div className="form-group">
                            <input
                                className={styles["form-control"]}
                                id="title"
                                type="text"
                                name="title"
                                defaultValue={currentPost.title}
                                onBlur={validateTitle}
                                required
                            />
                            {titleError && (
                                <p className={styles["field__error"]}>
                                    Title must be atleast 5 characters!
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <input
                                className={styles["form-control"]}
                                id="content"
                                type="text"
                                name="content"
                                defaultValue={currentPost.content}
                                onBlur={validateContent}
                                required
                            />
                            {contentError && (
                                <p className={styles["field__error"]}>
                                    Content must be atleast 20 characters!
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <input
                                className={styles["form-control"]}
                                id="imageUrl"
                                type="text"
                                name="imageUrl"
                                defaultValue={currentPost.imageUrl}
                                onBlur={validateImageUrl}
                                required
                            />

                            {imageUrlError && (
                                <p className={styles["field__error"]}>
                                    Enter a valid Image URL!
                                </p>
                            )}
                        </div>

                        <div className={styles["form__actions"]}>
                            <input
                                className={
                                    titleError ||
                                    contentError ||
                                    imageUrlError
                                        ? styles["button-disabled"]
                                        : styles["button-submit"]
                                }
                                type="submit"
                                disabled={
                                    titleError || contentError || imageUrlError
                                }
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
