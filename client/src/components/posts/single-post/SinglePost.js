import styles from "./assets/css/SinglePost.module.css";

export const SinglePost = ({ post }) => {
    return (
        <li className={styles["post"]}>
            <figure className={styles["post__image"]}>
                <img src={post.imageUrl} alt="" width={400} height={400} />
            </figure>

            <div className={styles["post__content"]}>
                <h1>{post.title}</h1>

                <p>{post.content}</p>

                <i>{post.author}</i>
            </div>
        </li>
    );
};
