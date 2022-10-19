import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./assets/css/Header.module.css";
import logo from './assets/images/logo.svg'
export const Header = () => {
    const { user, uid, logout } = useAuth();
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
        <>
            <nav
                className="navbar custom-navbar navbar-expand-md navbar-light fixed-top"
                data-spy="affix"
                data-offset-top="10"
            >
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="" />
                    </Link>
                    <button
                        className="navbar-toggler ml-auto"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/posts/topics">
                                    Topics
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/posts/ideas">
                                    Ideas
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/posts/research">
                                    Research
                                </Link>
                            </li>

                            {user && user?.email ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/create">
                                            Add Post
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to="/profile"
                                        >
                                            Profile
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to="/logout"
                                            onClick={handleLogout}
                                        >
                                            Sign Out
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            Sign In
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to="/register"
                                        >
                                            Sign Up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            
        </>
    );
};
{
    /* <header className={styles["header"]}>
            <div className={styles["header__inner"]}>
                <figure className={styles["logo"]}>
                    <Link to="/">
                        <img
                            src={require("./assets/images/logo.png")}
                            alt="logo"
                            width={500}
                            height={500}
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

                        {user && user?.email ? (
                            <>
                                <li>
                                    <Link to="/create">Add Post</Link>
                                </li>

                                <li>
                                    <Link to="/profile">Profile</Link>
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
        </header> */
}
