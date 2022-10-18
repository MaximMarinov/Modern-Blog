import styles from "./assets/css/PostList.module.css";
import { SinglePost } from "./single-post/SinglePost";
import { Link, useParams } from "react-router-dom";
import { UseCollection } from "../../hooks/useCollection";
import RingLoader from "react-spinners/RingLoader";

export const PostList = () => {
    const { collectionPath } = useParams();

    const { data, isLoading, hasError } = UseCollection(collectionPath);

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
        <>
            {hasError ? (
                <img src={require(`../../images/error-icon.png`)} alt="error" />
            ) : (
                <>
                    {isLoading ? (
                        <RingLoader
                            color={'#000'}
                        />
                    ) : (
                        <section className={styles["section-posts"]}>
                            <header className="header">
                                <div className="overlay">
                                    <h1 className="subtitle">{content}</h1>
                                    <h1 className="title">{title}</h1>
                                </div>
                                <div className="shape">
                                    <svg viewBox="0 0 1500 200">
                                        <path d="m 0,240 h 1500.4828 v -71.92164 c 0,0 -286.2763,-81.79324 -743.19024,-81.79324 C 300.37862,86.28512 0,168.07836 0,168.07836 Z" />
                                    </svg>
                                </div>
                                <div className="mouse-icon">
                                    <div className="wheel"></div>
                                </div>
                            </header>
                            <div className="shell">
                                <ul className={styles["post-list"]}>
                                    {data.map((post) => {
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
                    )}
                </>
            )}
        </>
    );
};
