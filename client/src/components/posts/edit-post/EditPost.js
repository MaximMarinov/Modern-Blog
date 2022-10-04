import styles from "./assets/css/EditPost.module.css";
import { useEffect, useState } from "react";
import { db } from "../../../firebase-config";
import { doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import * as postService from "../../../services/postsService";
import { useNavigate } from "react-router-dom";

export const EditPost = () => {
    const [values, setValues] = useState({
        title: "",
        content: "",
        author: "",
        imageUrl: "",
    });

    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const [authorError, setAuthorError] = useState("");
    const [imageUrlError, setImageUrlError] = useState("");

    const [currentPost, setCurrentPost] = useState({});

    const { collectionRef, postId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        postService.getPost(postRef).then((post) => setCurrentPost(post));
    }, []);

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const postRef = doc(db, collectionRef, postId);

    const validateTitle = () => {
        if (!values.title) {
            setTitleError(true);
        } else {
            setTitleError(false);
        }
    };

    const validateContent = () => {
        if (!values.content) {
            setContentError(true);
        } else {
            setContentError(false);
        }
    };

    const validateAuthor = () => {
        if (!values.author) {
            setAuthorError(true);
        } else {
            setAuthorError(false);
        }
    };

    const validateImageUrl = () => {
        if (!values.imageUrl) {
            setImageUrlError(true);
        } else {
            setImageUrlError(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        postService.editPost(postRef, { ...values });

        return navigate(`/${collectionRef}`);
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

                    <label className={styles["form__label"]} htmlFor="title">Title</label>
                    <div className={styles["field"]}>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder={`${currentPost.title}`}
                            onChange={changeHandler}
                            value={values.title}
                            onBlur={validateTitle}
                            required
                        />
                        {titleError && (
                            <p className={styles["field__error"]}>
                                Tittle is required!
                            </p>
                        )}
                    </div>

                    <label className={styles["form__label"]} htmlFor="content">Content</label>
                    <div className={styles["field"]}>
                        <input
                            id="content"
                            type="text"
                            name="content"
                            placeholder={`${currentPost.content}`}
                            onChange={changeHandler}
                            value={values.content}
                            onBlur={validateContent}
                            required
                        />
                        {contentError && (
                            <p className={styles["field__error"]}>
                                Content is required!
                            </p>
                        )}
                    </div>

                    <label className={styles["form__label"]} htmlFor="author">Author</label>
                    <div className={styles["field"]}>
                        <input
                            id="author"
                            type="text"
                            name="author"
                            placeholder={`${currentPost.author}`}
                            onChange={changeHandler}
                            value={values.author}
                            onBlur={validateAuthor}
                            required
                        />
                        {authorError && (
                            <p className={styles["field__error"]}>
                                Author is required!
                            </p>
                        )}
                    </div>

                    <label className={styles["form__label"]} htmlFor="imageUrl">Image URL</label>
                    <div className={styles["field"]}>
                        <input
                            id="imageUrl"
                            type="text"
                            name="imageUrl"
                            placeholder={`${currentPost.imageUrl}`}
                            onChange={changeHandler}
                            value={values.imageUrl}
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
