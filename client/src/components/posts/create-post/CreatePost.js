import styles from "./assets/css/CreatePost.module.css";
import { useState } from "react";
import { db } from "../../../firebase-config";
import { collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import * as postService from "../../../services/postsService";

export const CreatePost = () => {
    const [values, setValues] = useState({
        title: "",
        content: "",
        author: "",
        imageUrl: "",
        collectionVal: "",
    });

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const [authorError, setAuthorError] = useState("");
    const [imageUrlError, setImageUrlError] = useState("");
    const [collectionValError, setCollectionValError] = useState("");

    const navigate = useNavigate();

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

    const validateCollectionVal = () => {
        if (!values.collectionVal) {
            setCollectionValError(true);
        } else {
            setCollectionValError(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const postCollectionRef = collection(db, values.collectionVal);

        postService.createPost(postCollectionRef, {
            ...values,
        });

        return navigate(`/posts/${values.collectionVal}`);
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
                        <h1>Add Post</h1>
                    </div>

                    <label className={styles["form__label"]} htmlFor="title">
                        Title
                    </label>
                    <div className={styles["field"]}>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Title"
                            onChange={changeHandler}
                            value={values.title}
                            onBlur={validateTitle}
                            required
                        />
                    </div>

                    {titleError && (
                        <p className={styles["field__error"]}>
                            Tittle is required!
                        </p>
                    )}

                    <label className={styles["form__label"]} htmlFor="content">
                        Content
                    </label>
                    <div className={styles["field"]}>
                        <input
                            id="content"
                            type="text"
                            name="content"
                            placeholder="Content"
                            onChange={changeHandler}
                            value={values.content}
                            onBlur={validateContent}
                            required
                        />
                    </div>

                    {contentError && (
                        <p className={styles["field__error"]}>
                            Content is required!
                        </p>
                    )}

                    <label className={styles["form__label"]} htmlFor="author">
                        Author
                    </label>
                    <div className={styles["field"]}>
                        <input
                            id="author"
                            type="text"
                            name="author"
                            placeholder="Author"
                            onChange={changeHandler}
                            value={values.author}
                            onBlur={validateAuthor}
                            required
                        />
                    </div>

                    {authorError && (
                        <p className={styles["field__error"]}>
                            Author is required!
                        </p>
                    )}

                    <label className={styles["form__label"]} htmlFor="imageUrl">
                        Image URL
                    </label>
                    <div className={styles["field"]}>
                        <input
                            id="imageUrl"
                            type="text"
                            name="imageUrl"
                            placeholder="Image Url"
                            onChange={changeHandler}
                            value={values.imageUrl}
                            onBlur={validateImageUrl}
                            required
                        />
                    </div>

                    {imageUrlError && (
                        <p className={styles["field__error"]}>
                            Image Url is required!
                        </p>
                    )}

                    <label
                        className={styles["form__label"]}
                        htmlFor="collectionVal"
                    >
                        Collection
                    </label>
                    <div className={styles["field"]}>
                        <select
                            id="collectionVal"
                            type="text"
                            name="collectionVal"
                            placeholder="Image Url"
                            onChange={changeHandler}
                            value={values.collectionVal}
                            onBlur={validateCollectionVal}
                            required
                        >
                            <option value="" disabled={true}>
                                Select collection
                            </option>
                            <option value="topics">Topics</option>
                            <option value="ideas">Ideas</option>
                            <option value="research">Research</option>
                        </select>
                    </div>

                    {collectionValError && (
                        <p className={styles["field__error"]}>
                            Specify collection!
                        </p>
                    )}

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
