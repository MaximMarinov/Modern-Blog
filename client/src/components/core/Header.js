import "./Header.css";

export const Header = () => {
    return (
        <header className="header">
            <div className="shell">
                <div className="header__inner">
                    <figure className="logo">
                        <a href="#">
                            <img
                                src="../../logo.png"
                                alt="logo"
                                width="500"
                                height="500"
                            />
                        </a>
                    </figure>

                    <nav className="nav">
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
            </div>
        </header>
    );
};
