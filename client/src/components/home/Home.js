import styles from "./assets/css/Home.module.css";
import { TopicsList } from "../posts/topics-list/TopicsList";
import { ResearchList } from "../posts/research-list/ResearchList";
import { IdeasList } from "../posts/ideas-list/IdeasList";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <>
            <section className={styles["section-hero"]}>
                <div className={styles["section__inner"]}>
                    <figure className={styles["section__image"]}>
                        <img
                            src={require("./assets/images/hero.png")}
                            alt="hero"
                            width="2240"
                            height="1260"
                        />
                    </figure>

                    <div className={styles["section__content"]}>
                        <h1>Modern</h1>

                        <h1 className={styles["colored"]}>Blog</h1>

                        <p>
                            Here you can share experiences on different topics!
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles["section-services"]}>
                <div className="shell">
                    <h1 className={`${styles["title"]} ${styles["underline"]}`}>
                        Read about...
                    </h1>

                    <ul className={styles["services"]}>
                        <li className={styles["service"]}>
                            <Link to="/topics">
                                <figure className={styles["icon"]}>
                                    <img
                                        src={require("./assets/images/topics-icon.png")}
                                        alt="topics"
                                        width={300}
                                        height={300}
                                    />
                                </figure>

                                <h1>Topics</h1>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Voluptatem eum maxime
                                    aspernatur dolores autem minima, recusandae
                                    provident ducimus possimus suscipit harum
                                    mollitia ut quam, error consectetur quo,
                                    unde asperiores est?
                                </p>
                            </Link>
                        </li>

                        <li className={styles["service"]}>
                            <Link to="/ideas">
                                <figure className={styles["icon"]}>
                                    <img
                                        src={require("./assets/images/ideas-icon.png")}
                                        alt="ideas"
                                        width="500"
                                        height="500"
                                    />
                                </figure>

                                <h1>Ideas</h1>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Voluptatem eum maxime
                                    aspernatur dolores autem minima, recusandae
                                    provident ducimus possimus suscipit harum
                                    mollitia ut quam, error consectetur quo,
                                    unde asperiores est?
                                </p>
                            </Link>
                        </li>

                        <li className={styles["service"]}>
                            <Link to="/research">
                                <figure className={styles["icon"]}>
                                    <img
                                        src={require("./assets/images/research-icon.png")}
                                        alt="research"
                                        width="500"
                                        height="500"
                                    />
                                </figure>

                                <h1>Research</h1>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Voluptatem eum maxime
                                    aspernatur dolores autem minima, recusandae
                                    provident ducimus possimus suscipit harum
                                    mollitia ut quam, error consectetur quo,
                                    unde asperiores est?
                                </p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};
