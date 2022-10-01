import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./assets/css/PostDetails.module.css";
import { doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import * as postService from "../../../services/postsService";
import { db } from "../../../firebase-config";
import { useNavigate } from "react-router-dom";

export const PostDetails = ({ collection }) => {
    const { postId } = useParams();

    const [currentPost, setCurrentPost] = useState({});

    const postRef = doc(db, collection, postId);

    const navigate = useNavigate();

    const deleteHandler = () => {
        postService.deletePost(postRef);
        navigate(`/${collection}`);
    };

    useEffect(() => {
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
                <Link to={`/edit/${collection}/${postId}`}>Edit</Link>
                <button onClick={deleteHandler}>Delete</button>
            </div>
        </section>
    );
};
