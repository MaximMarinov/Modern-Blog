import styles from "./assets/css/CreatePost.module.css";
import { useState } from "react";
import { auth, db } from "../../../firebase-config";
import { collection, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import * as postService from "../../../services/postsService";
import * as userService from "../../../services/userService";
import { useAuth } from "../../../hooks/useAuth";
import { UseUser } from "../../../hooks/useUser";

export const CreatePost = () => {
    const { uid } = useAuth();

    const { currentUser } = UseUser();

    const [values, setValues] = useState({
        title: "",
        content: "",
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
    const [imageUrlError, setImageUrlError] = useState("");
    const [collectionValError, setCollectionValError] = useState("");

    const navigate = useNavigate();

    const validateTitle = () => {
        if (values.title.length < 5) {
            setTitleError(true);
        } else {
            setTitleError(false);
        }
    };

    const validateContent = () => {
        if (values.content.length < 20) {
            setContentError(true);
        } else {
            setContentError(false);
        }
    };

    const validateImageUrl = () => {
        const pattern =
            /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|webp|avif|gif|svg)/;
        if (pattern.test(values.imageUrl)) {
            setImageUrlError(false);
        } else {
            setImageUrlError(true);
        }
    };

    const validateCollectionVal = () => {
        if (!values.collectionVal) {
            setCollectionValError(true);
        } else {
            setCollectionValError(false);
        }
    };

    const postData = {
        ...values,
        author: currentUser.name,
        ownerId: uid,
        comments: [],
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const postCollectionRef = collection(db, values.collectionVal);

        postService
            .createPost(postCollectionRef, {
                ...postData,
            })
            .then((post) => {
                const postRef = doc(db, postData.collectionVal, post.id);
                postService.addPostId(postRef, {
                    id: post.id,
                });

                postService.getPost(postRef).then((post) => {
                    userService.addPostToUser(post);
                });
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
                            Title must be atleast 5 characters!
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
                            Content must be atleast 20 characters!
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
                            Enter a valid Image URL!
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
                                imageUrlError ||
                                collectionValError
                            }
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
