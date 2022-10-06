import styles from "./assets/css/PostList.module.css";
import { SinglePost } from "./single-post/SinglePost";
import { Link, useParams } from "react-router-dom";
import { UseCollection } from "../../hooks/useCollection";

export const PostList = () => {
    const { collectionPath } = useParams();

    const posts = UseCollection(collectionPath);

    let title = "";
    let content = "";

    switch (collectionPath) {
        case "topics":
            title = "Topics";
            break;

        case "research":
            title = "Research";
            break;

        case "ideas":
            title = "Ideas";
            break;

        default:
            break;
    }

    switch (collectionPath) {
        case "topics":
            content =
                "Here you can read about different topics, regarding everything!";
            break;

        case "research":
            content = "Find out about the latest inovations in every sphere!";
            break;

        case "ideas":
            content = "Some interesting concepts...";
            break;

        default:
            break;
    }

    return (
        <section className={styles["section-posts"]}>
            <div className={styles["section__header"]}>
                <figure className={styles["section__image"]}>
                    <img
                        src={require(`../posts/assets/images/${collectionPath}-banner.png`)}
                        alt="topics-banner"
                    />
                </figure>

                <div className={styles["header__content"]}>
                    <h1>{title}</h1>

                    <p>{content}</p>
                </div>
            </div>
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
