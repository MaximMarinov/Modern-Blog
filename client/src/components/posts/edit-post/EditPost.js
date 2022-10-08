import styles from "./assets/css/EditPost.module.css";
import { useState } from "react";
import { db } from "../../../firebase-config";
import { doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import * as postService from "../../../services/postsService";
import { useNavigate } from "react-router-dom";
import { UseDoc } from "../../../hooks/useDoc";

export const EditPost = () => {
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const [imageUrlError, setImageUrlError] = useState("");

    const { collectionPath, postId } = useParams();

    const navigate = useNavigate();

    const currentPost = UseDoc(collectionPath, postId);

    const postRef = doc(db, collectionPath, postId);

    const validateTitle = () => {
        if (!currentPost.title) {
            setTitleError(true);
        } else {
            setTitleError(false);
        }
    };

    const validateContent = () => {
        if (!currentPost.content) {
            setContentError(true);
        } else {
            setContentError(false);
        }
    };

    const validateImageUrl = () => {
        if (!currentPost.imageUrl) {
            setImageUrlError(true);
        } else {
            setImageUrlError(false);
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
            <div className={styles["form-box"]}>
                <form
                    action="PUT"
                    className={styles["form"]}
                    onSubmit={submitHandler}
                >
                    <div className={styles["form__head"]}>
                        <h1>Edit Post</h1>
                    </div>

                    <label className={styles["form__label"]} htmlFor="title">
                        Title
                    </label>
                    <div className={styles["field"]}>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            defaultValue={currentPost.title}
                            onBlur={validateTitle}
                            required
                        />
                        {titleError && (
                            <p className={styles["field__error"]}>
                                Tittle is required!
                            </p>
                        )}
                    </div>

                    <label className={styles["form__label"]} htmlFor="content">
                        Content
                    </label>
                    <div className={styles["field"]}>
                        <input
                            id="content"
                            type="text"
                            name="content"
                            defaultValue={currentPost.content}
                            onBlur={validateContent}
                            required
                        />
                        {contentError && (
                            <p className={styles["field__error"]}>
                                Content is required!
                            </p>
                        )}
                    </div>

                    <label className={styles["form__label"]} htmlFor="imageUrl">
                        Image URL
                    </label>
                    <div className={styles["field"]}>
                        <input
                            id="imageUrl"
                            type="text"
                            name="imageUrl"
                            defaultValue={currentPost.imageUrl}
                            onBlur={validateImageUrl}
                            required
                        />

                        {imageUrlError && (
                            <p className={styles["field__error"]}>
                                Image URL is required!
                            </p>
                        )}
                    </div>

                    <div className={styles["form__actions"]}>
                        <input
                            className="button submit"
                            type="submit"
                            disabled={
                                titleError || contentError || imageUrlError
                            }
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
