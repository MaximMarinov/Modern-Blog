import { Link, useParams } from "react-router-dom";
import styles from "./assets/css/PostDetails.module.css";
import * as postService from "../../../services/postsService";
import * as userService from "../../../services/userService";
import { useNavigate } from "react-router-dom";
import { UseDoc } from "../../../hooks/useDoc";
import { db } from "../../../firebase-config";
import { doc } from "firebase/firestore";
import { useAuth } from "../../../hooks/useAuth";
import RingLoader from "react-spinners/RingLoader";

export const PostDetails = () => {
    const { collectionPath, postId } = useParams();
    const navigate = useNavigate();

    const { user } = useAuth();

    const { data, isLoading, hasError } = UseDoc(collectionPath, postId);

    const deleteHandler = () => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (confirmation) {
            const postRef = doc(db, collectionPath, postId);

            postService.deletePost(postRef);
            userService.deletePostUser(postRef);
            navigate(`/posts/${collectionPath}`);
        }
    };

    return (
        <>
            {hasError ? (
                <img
                    src={require(`../../../images/error-icon.png`)}
                    alt="error"
                />
            ) : (
                <>
                    {isLoading ? (
                        <RingLoader
                            color={"#ffde59"}
                            loading={isLoading}
                            size={150}
                        />
                    ) : (
                        <section className={styles["section-details"]}>
                            <figure className={styles["section__image"]}>
                                <img src={data.imageUrl} alt={data.title} />
                            </figure>

                            <div className="shell">
                                <div className={styles["section__content"]}>
                                    <h1>{data.title}</h1>

                                    <p>{data.content}</p>

                                    <i>{data.author}</i>
                                </div>

                                {user && user?.uid == data.ownerId ? (
                                    <div className={styles["section__actions"]}>
                                        <Link
                                            className="button"
                                            to={`/edit/${collectionPath}/${postId}`}
                                        >
                                            Edit
                                        </Link>
                                        <a
                                            className="button delete"
                                            onClick={deleteHandler}
                                        >
                                            Delete
                                        </a>
                                    </div>
                                ) : null}
                            </div>
                        </section>
                    )}
                </>
            )}
        </>
    );
};
