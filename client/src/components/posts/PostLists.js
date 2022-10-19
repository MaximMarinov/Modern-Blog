import styles from "./assets/css/PostList.module.css";
import { SinglePost } from "./single-post/SinglePost";
import { Link, useParams } from "react-router-dom";
import { UseCollection } from "../../hooks/useCollection";
import RingLoader from "react-spinners/RingLoader";
import { CSSProperties } from "react";
import topicsImage from "../pages/home/assets/images/topics.jpg";
import ideasImage from "../pages/home/assets/images/ideas.jpg";
import researchImage from "../pages/home/assets/images/research.jpg";

export const PostList = () => {
    const { collectionPath } = useParams();

    const { data, isLoading, hasError } = UseCollection(collectionPath);

    const override = {
        display: "block",
        margin: "40vh auto 50vh",
    };

    let title = "";
    let content = "";
    let image = "";

    switch (collectionPath) {
        case "topics":
            title = "Topics";
            content =
                "Here you can read about different topics, regarding everything!";
            image = topicsImage;
            break;

        case "research":
            title = "Research";
            content = "Find out about the latest inovations in every sphere!";
            image = researchImage;
            break;

        case "ideas":
            title = "Ideas";
            content = "Some interesting concepts...";
            image = ideasImage;
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
                            color={"#0032A0"}
                            cssOverride={override}
                            size={200}
                        />
                    ) : (
                        <>
                            <section className={styles["section-posts"]}>
                                <header
                                    className="header"
                                    style={{
                                        backgroundImage: `url(${image})`,
                                        height: `50%`,
                                    }}
                                >
                                    <div className="overlay">
                                        <h1 className="subtitle">{content}</h1>
                                        <h1 className="title">{title}</h1>
                                    </div>
                                    <div className="shape">
                                        <svg viewBox="0 0 1500 200">
                                            <path d="m 0,240 h 1500.4828 v -71.92164 c 0,0 -286.2763,-81.79324 -743.19024,-81.79324 C 300.37862,86.28512 0,168.07836 0,168.07836 Z" />
                                        </svg>
                                    </div>
                                </header>

                                <section id="service" className="section pt-0">
                                    <div className="container">
                                        <h6 className="section-title text-center">
                                            Recent Posts
                                        </h6>

                                        <div className="row">
                                            {data.map((post) => {
                                                return (
                                                    <div
                                                        className="col-md-4"
                                                        key={post.id}
                                                    >
                                                        <Link
                                                            className="card mb-4 mb-md-0"
                                                            to={`/posts/${collectionPath}/${post.id}`}
                                                        >
                                                            <SinglePost
                                                                post={post}
                                                            />
                                                        </Link>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </section>
                            </section>
                        </>
                    )}
                </>
            )}
        </>
    );
};
