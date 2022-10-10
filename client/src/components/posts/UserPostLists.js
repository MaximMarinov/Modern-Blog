import styles from "./assets/css/PostList.module.css";
import { SinglePost } from "./single-post/SinglePost";
import { Link, useParams } from "react-router-dom";
import { UseCollection } from "../../hooks/useCollection";

export const UserPostList = () => {
    const { collectionPath } = useParams();

    const posts = UseCollection(collectionPath);

    return (
        <section className={styles["section-posts"]}>
            <div className="shell">
                <ul className={styles["post-list"]}>
                    {posts.map((post) => {
                        return (
                            <Link
                                to={`/posts/${collectionPath}/${post.id}`}
                                key={post.id}
                                className={styles["post"]}
                            >
                                <SinglePost post={post} />
                            </Link>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
