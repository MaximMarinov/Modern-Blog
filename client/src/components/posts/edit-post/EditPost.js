import styles from "./assets/css/EditPost.module.css";
import { useState } from "react";
import { db } from "../../../firebase-config";
import { updateDoc, collection, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";

export const EditPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [collectionVal, setCollectionVal] = useState("");

    const { postId } = useParams();

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
        const updateUser = async (postId) => {

            const postCollectionRef = collection(db, collectionVal);

            const currentUser = doc(db, postCollectionRef, postId);

            await updateDoc(currentUser, {
                title,
                content,
                imageUrl,
                author,
            });
        };

        updateUser(postId);
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
                            value={collection}
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
