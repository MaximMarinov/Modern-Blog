import { Link, useParams } from "react-router-dom";
import styles from "./assets/css/PostDetails.module.css";
import * as postService from "../../../services/postsService";
import { useNavigate } from "react-router-dom";
import { UseDoc } from "../../../hooks/useDoc";
import { db } from "../../../firebase-config";
import { doc } from "firebase/firestore";

export const PostDetails = () => {
    const { collectionPath, postId } = useParams();

    const currentPost = UseDoc(collectionPath, postId);

    const navigate = useNavigate();

    const deleteHandler = () => {
        const postRef = doc(db, collectionPath, postId);
        
        postService.deletePost(postRef);
        navigate(`/posts/${collectionPath}`);
    };

    return (
        <section className={styles["section-details"]}>
            <figure className={styles["section__image"]}>
                <img src={currentPost.imageUrl} alt={currentPost.title} />
            </figure>

            <div className="shell">
                <div className={styles["section__content"]}>
                    <h1>{currentPost.title}</h1>

                    <p>{currentPost.content}</p>

                    <i>{currentPost.author}</i>
                </div>

                <div className={styles["section__actions"]}>
                    <Link className="button" to={`/edit/${collectionPath}/${postId}`}>Edit</Link>
                    <a className="button delete" onClick={deleteHandler}>Delete</a>
                </div>
            </div>
        </section>
    );
};
