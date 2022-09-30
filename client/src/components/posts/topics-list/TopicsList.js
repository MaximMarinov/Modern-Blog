import styles from "../assets/css/PostList.module.css";
import { collection,  } from "firebase/firestore";
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
            <div className={styles['shell']}>
                <ul className={styles["post-list"]}>
                    {posts.map((post) => {
                        return (
                            <Link to={`/topics/${post.id}`} key={post.id}>
                                <SinglePost
                                    post={post}
                                />
                            </Link>
                        );
                    })}
                </ul>
            </div>

        </section>
    );
};
