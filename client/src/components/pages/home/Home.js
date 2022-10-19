import styles from "./assets/css/Home.module.css";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <>
            <header className="header">
                <div className="overlay">
                    <h1 className="subtitle">
                        CRUD Operations, Authentication, Authorization, Firebase
                        Back-End
                    </h1>
                    <h1 className="title">Modern Blog</h1>
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
            <section id="service" className="section pt-0">
                <div className="container">
                    <h6 className="section-title text-center">Post Categories</h6>
                    <h6 className="section-subtitle text-center mb-5 pb-3">
                        Find what can grab your attention
                    </h6>

                    <div className="row">
                        <div className="col-md-4">
                            <Link
                                className="card mb-4 mb-md-0"
                                to={"/posts/topics"}
                            >
                                <figure>
                                    <img
                                        className="card-img"
                                        src={require("./assets/images/topics.jpg")}
                                        alt=""
                                    />
                                </figure>
                                <div className="card-body">
                                    <h5 className="card-title mt-3">Topics</h5>
                                    <p className="mb-0">
                                        Here you can read about different
                                        topics!
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link
                                className="card mb-4 mb-md-0"
                                to={"/posts/research"}
                            >
                                <figure>
                                    <img
                                        className="card-img"
                                        src={require("./assets/images/research.jpg")}
                                        alt=""
                                    />
                                </figure>
                                <div className="card-body">
                                    <h5 className="card-title mt-3">
                                        Research
                                    </h5>
                                    <p className="mb-0">
                                        Find out about the latest inovations in
                                        every sphere!
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link
                                className="card mb-4 mb-md-0"
                                to={"/posts/ideas"}
                            >
                                <figure>
                                    <img
                                        className="card-img"
                                        src={require("./assets/images/ideas.jpg")}
                                        alt=""
                                    />
                                </figure>

                                <div className="card-body">
                                    <h5 className="card-title mt-3">Ideas</h5>
                                    <p className="mb-0">
                                        Some interesting concepts...
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

{
    /* <>
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
                            <Link to="posts/topics">
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
                            <Link to="posts/ideas">
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
                            <Link to="posts/research">
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
        </> */
}
