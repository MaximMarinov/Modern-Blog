import styles from "./assets/css/CreatePost.module.css";
import { useState } from "react";
import { auth, db } from "../../../firebase-config";
import { collection, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import * as postService from "../../../services/postsService";
import * as userService from "../../../services/userService";
import { useAuth } from "../../../hooks/useAuth";
import { UseUser } from "../../../hooks/useUser";
import addImage from "./assets/images/add.jpg";

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
            <header
                className="header"
                style={{
                    height: `50%`,
                    background: `url(${addImage})`,
                }}
            >
                <div
                    className="overlay"
                    style={{ background: `rgba(0, 0, 0, 0.4)` }}
                >
                    <h1 className="title">Add Post</h1>
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
                        action="POST"
                        className={styles["form"]}
                        onSubmit={submitHandler}
                    >
                        <div className="form-group">
                            <input
                                className={styles["form-control"]}
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

                        <div className="form-group">
                            <input
                                className={styles["form-control"]}
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

                        <div className="form-group">
                            <input
                                className={styles["form-control"]}
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

                        <div className="dropdown d-inline-block">
                            <select
                                className={styles["form-control"]}
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
                                className={
                                    titleError ||
                                    contentError ||
                                    imageUrlError ||
                                    collectionValError
                                        ? styles["button-disabled"]
                                        : styles["button-submit"]
                                }
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
        </div>
    );
};
