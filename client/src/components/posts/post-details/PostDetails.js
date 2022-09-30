import { useLocation, useParams } from "react-router-dom";
import styles from "./assets/css/PostDetails.module.css";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import * as postService from "../../../services/postsService";
import { db } from "../../../firebase-config";

export const PostDetails = ({collection}) => {
    const { postId } = useParams();
    const { pathname } = useLocation();

    const [currentPost, setCurrentPost] = useState({});


    useEffect(() => {
        const postRef = doc(db, collection, postId);

        postService.getPost(postRef).then((post) => setCurrentPost(post));
    }, []);

    return (
        <section className={styles["section-details"]}>
            <figure className={styles["section__image"]}>
                <img src={currentPost.imageUrl} alt={currentPost.title} />
            </figure>

            <div className={styles["section__content"]}>
                <h1>{currentPost.title}</h1>

                <p>{currentPost.content}</p>

                <i>{currentPost.author}</i>
            </div>

            <div className={styles["section__actions"]}>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </section>
    );
};
