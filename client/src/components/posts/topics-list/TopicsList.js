import styles from "../assets/css/PostList.module.css";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import * as postService from "../../../services/postsService";
import { db } from "../../../firebase-config";
import { SinglePost } from "../single-post/SinglePost";
import { Link } from "react-router-dom";

export const TopicsList = () => {
    const [posts, setPosts] = useState([]);

    const topicsCollectionRef = collection(db, "topics");

    useEffect(() => {
        postService
            .getPosts(topicsCollectionRef)
            .then((collection) => setPosts(collection));
    }, []);

    return (
        <section className={styles["section-posts"]}>
            <div className={styles["section__header"]}>
                <figure className={styles["section__image"]}>
                    <img
                        src={require("./assets/images/topics-banner.png")}
                        alt="topics-banner"
                    />
                </figure>

                <div className={styles["header__content"]}>
                    <h1>Topics</h1>

                    <p>Here you can read about different topics, regarding everything!</p>
                </div>
            </div>
            <div className="shell">
                <ul className={styles["post-list"]}>
                    {posts.map((post) => {
                        return (
                            <Link
                                to={`/topics/${post.id}`}
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
