import { Link } from "react-router-dom";
import styles from "./assets/css/Header.module.css";

export const Header = () => {
    return (
        <header className={styles["header"]}>
            <div className={styles["header__inner"]}>
                <figure className={styles["logo"]}>
                    <Link to="/">
                        <img
                            src={require("./assets/images/logo.png")}
                            alt="logo"
                            width="500"
                            height="500"
                        />
                    </Link>
                </figure>

                <nav className={styles["nav"]}>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        <li>
                            <Link to="/topics">Topics</Link>
                        </li>
                        
                        <li>
                            <Link to="/ideas">Ideas</Link>
                        </li>

                        <li>
                            <Link to="/research">Research</Link>
                        </li>
                        
                        <li>
                            <Link to="/create">Add Post</Link>
                        </li>
                        
                        <li>
                            <Link to="/login">Sign In</Link>
                        </li>

                        <li>
                            <Link to="/register">Sign Up</Link>
                        </li>

                        <li>
                            <Link to="/logout">Sign Out</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
