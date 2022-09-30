import styles from "../assets/css/PostList.module.css";

import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import * as postService from "../../../services/postsService";
import { db } from "../../../firebase-config";
import { Link } from "react-router-dom";

import { SinglePost } from "../single-post/SinglePost";

export const ResearchList = () => {
    const [posts, setPosts] = useState([]);
    const researchCollectionRef = collection(db, "research");

    useEffect(() => {
        postService.getPosts(researchCollectionRef).then((collection) => {
            setPosts(collection);
        });
    }, []);

    return (
        <ul className={styles["post-list"]}>
            {posts.map((post) => {
                return (
                    <Link to={`/research/${post.id}`} key={post.id}>
                        <SinglePost post={post} />
                    </Link>
                );
            })}
        </ul>
    );
};
