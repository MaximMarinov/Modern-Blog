import styles from "../assets/css/PostList.module.css";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import * as postService from "../../../services/postsService";
import { db } from "../../../firebase-config";

import { SinglePost } from "../single-post/SinglePost";

export const TopicsList = () => {
    const [posts, setPosts] = useState([]);
    const topicsCollectionRef = collection(db, "topics");

    useEffect(() => {
        postService
            .getPosts(topicsCollectionRef)
            .then((collection) => setPosts(collection));
    }, []);

    return (
        <ul className={styles["post-list"]}>
            {posts.map((post) => {
                return <SinglePost key={post.id} post={post} />;
            })}
        </ul>
    );
};
