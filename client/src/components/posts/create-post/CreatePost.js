import styles from "./assets/css/CreatePost.module.css";
import { useState } from "react";
import { db } from "../../../firebase-config";
import { collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import * as postService from "../../../services/postsService";

export const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [collectionVal, setCollectionVal] = useState("");
    const navigate = useNavigate();

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

    const collectionChangeHandler = (e) => {
        setCollectionVal(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const postCollectionRef = collection(db, collectionVal);

        postService.createPost(postCollectionRef, {
            title,
            content,
            imageUrl,
            author,
            collectionVal,
        });

        return navigate(`/${collectionVal}`);
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

                    <div className={styles["field"]}>
                        <input
                            type="text"
                            placeholder="Title"
                            onChange={titleChangeHandler}
                            value={title}
                        />
                    </div>

                    <div className={styles["field"]}>
                        <input
                            type="text"
                            placeholder="Content"
                            onChange={contentChangeHandler}
                            value={content}
                        />
                    </div>

                    <div className={styles["field"]}>
                        <input
                            type="text"
                            placeholder="Author"
                            onChange={authorChangeHandler}
                            value={author}
                        />
                    </div>

                    <div className={styles["field"]}>
                        <input
                            type="text"
                            placeholder="Image Url"
                            onChange={imgChangeHandler}
                            value={imageUrl}
                        />
                    </div>

                    <div className={styles["field"]}>
                        <select
                            type="text"
                            placeholder="Image Url"
                            onChange={collectionChangeHandler}
                            value={collectionVal}
                        >
                            <option value="topics">Topics</option>
                            <option value="ideas">Ideas</option>
                            <option value="research">Research</option>
                        </select>
                    </div>

                    <div className={styles["form__actions"]}>
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};
