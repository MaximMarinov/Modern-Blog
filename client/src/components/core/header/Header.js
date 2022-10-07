import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./assets/css/Header.module.css";

export const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (e) {
            console.log(e.message);
        }
    };

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
                            <Link to="/posts/topics">Topics</Link>
                        </li>

                        <li>
                            <Link to="/posts/ideas">Ideas</Link>
                        </li>

                        <li>
                            <Link to="/posts/research">Research</Link>
                        </li>

                        {user && user.email ? (
                            <>
                                <li>
                                    <Link to="/create">Add Post</Link>
                                </li>

                                <li>
                                    <Link to="/profile">{user.email}</Link>
                                </li>

                                <li>
                                    <Link to="/logout" onClick={handleLogout}>
                                        Sign Out
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">Sign In</Link>
                                </li>

                                <li>
                                    <Link to="/register">Sign Up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};
