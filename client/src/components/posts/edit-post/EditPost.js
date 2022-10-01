import styles from "./assets/css/EditPost.module.css";
import { useEffect, useState } from "react";
import { db } from "../../../firebase-config";
import { updateDoc, collection, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import * as postService from "../../../services/postsService";
import { useNavigate } from "react-router-dom";

export const EditPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const [authorError, setAuthorError] = useState("");
    const [imageUrlError, setImageUrlError] = useState("");

    const [currentPost, setCurrentPost] = useState({});

    const { collectionRef, postId } = useParams();

    const postRef = doc(db, collectionRef, postId);

    const navigate = useNavigate();

    useEffect(() => {
        postService.getPost(postRef).then((post) => setCurrentPost(post));
    }, []);

    const titleChangeHandler = (e) => {
        setTitle(e.target.value);
    };

    const contentChangeHandler = (e) => {
        setContent(e.target.value);
    };

    const authorChangeHandler = (e) => {
        setAuthor(e.target.value);
    };

    const imgChangeHandler = (e) => {
        setImageUrl(e.target.value);
    };

    const validateTitle = () => {
        if (!title) {
            setTitleError(true);
        } else {
            setTitleError(false);
        }
    };

    const validateContent = () => {
        if (!content) {
            setContentError(true);
        } else {
            setContentError(false);
        }
    };

    const validateAuthor = () => {
        if (!author) {
            setAuthorError(true);
        } else {
            setAuthorError(false);
        }
    };

    const validateImageUrl = () => {
        if (!imageUrl) {
            setImageUrlError(true);
        } else {
            setImageUrlError(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        postService.editPost(postRef, { title, content, author, imageUrl });

        return navigate(`/${collectionRef}`);
    };

    return (
        <div className="shell">
            <div className={styles["form-box"]}>
                <form
                    action="POST"
                    className={styles["form"]}
                    onSubmit={submitHandler}
                >
                    <div className={styles["form__head"]}>
                        <h1>Edit Post</h1>
                    </div>

                    <div className={styles["field"]}>
                        <input
                            type="text"
                            placeholder={`${currentPost.title}`}
                            onChange={titleChangeHandler}
                            value={title}
                            onBlur={validateTitle}
                            required
                        />
                        {titleError && (
                            <p className={styles["field__error"]}>
                                Tittle is required!
                            </p>
                        )}
                    </div>

                    <div className={styles["field"]}>
                        <input
                            type="text"
                            placeholder={`${currentPost.content}`}
                            onChange={contentChangeHandler}
                            value={content}
                            onBlur={validateContent}
                            required
                        />
                        {contentError && (
                            <p className={styles["field__error"]}>
                                Content is required!
                            </p>
                        )}
                    </div>

                    <div className={styles["field"]}>
                        <input
                            type="text"
                            placeholder={`${currentPost.author}`}
                            onChange={authorChangeHandler}
                            value={author}
                            onBlur={validateAuthor}
                            required
                        />
                        {authorError && (
                            <p className={styles["field__error"]}>
                                Author is required!
                            </p>
                        )}
                    </div>

                    <div className={styles["field"]}>
                        <input
                            type="text"
                            placeholder={`${currentPost.imageUrl}`}
                            onChange={imgChangeHandler}
                            value={imageUrl}
                            onBlur={validateImageUrl}
                            required
                        />

                        {imageUrlError && (
                            <p className={styles["field__error"]}>
                                Image Url is required!
                            </p>
                        )}
                    </div>

                    <div className={styles["form__actions"]}>
                        <input
                            type="submit"
                            disabled={
                                titleError ||
                                contentError ||
                                authorError ||
                                imageUrlError
                            }
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
