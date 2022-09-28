import styles from "./assets/css/Header.module.css";

export const Header = () => {
    return (
        <header className={styles["header"]}>
            <div className={styles["header__inner"]}>
                <figure className={styles["logo"]}>
                    <a href="#">
                        <img
                            src={require("./assets/images/logo.png")}
                            alt="logo"
                            width="500"
                            height="500"
                        />
                    </a>
                </figure>

                <nav className={styles["nav"]}>
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>

                        <li>
                            <a href="#">Topics</a>
                        </li>

                        <li>
                            <a href="#">Sign In</a>
                        </li>

                        <li>
                            <a href="#">Sign Up</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
