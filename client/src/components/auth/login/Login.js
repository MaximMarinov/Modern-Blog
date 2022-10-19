import styles from "./assets/css/Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import loginImage from "./assets/images/login.jpg";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();

    const { signIn } = useAuth();

    const validateEmail = () => {
        const pattern =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (pattern.test(email)) {
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    };

    const validatePassword = () => {
        if (!password) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            navigate("/profile");
        } catch (e) {
            setLoginError(e.message);
            if (loginError === "Firebase: Error (auth/user-not-found).") {
                setLoginError("Wrong Email or Password!");
            } else if (
                loginError === "Firebase: Error (auth/wrong-password)."
            ) {
                setLoginError("Wrong Password!");
            }
        }
    };

    return (
        <div className="shell">
            {loginError && (
                <p className={styles["field__error"]}>{loginError}</p>
            )}

            <header
                className="header"
                style={{
                    height: `50%`,
                    background: `url(${loginImage})`,
                }}
            >
                <div
                    className="overlay"
                    style={{ background: `rgba(0, 0, 0, 0.5)` }}
                >
                    <h1 className="title">Sign In</h1>
                </div>
                <div className="shape">
                    <svg viewBox="0 0 1500 200">
                        <path d="m 0,240 h 1500.4828 v -71.92164 c 0,0 -286.2763,-81.79324 -743.19024,-81.79324 C 300.37862,86.28512 0,168.07836 0,168.07836 Z" />
                    </svg>
                </div>
            </header>

            <div className="container">
                <div className={styles["form-box"]}>
                    <form
                        action="POST"
                        className={styles["form"]}
                        onSubmit={submitHandler}
                    >
                        <div className={"form-group"}>
                            <input
                                placeholder="Email"
                                id="email"
                                type="email"
                                name="email"
                                className={styles["form-control"]}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                onBlur={validateEmail}
                                required
                            />
                            {emailError && (
                                <p className={styles["field__error"]}>
                                    Enter a valid email address!
                                </p>
                            )}
                        </div>

                        <div className={"form-group"}>
                            <input
                                placeholder="Password"
                                id="password"
                                type="password"
                                name="password"
                                className={styles["form-control"]}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                onBlur={validatePassword}
                                required
                            />
                            {passwordError && (
                                <p className={styles["field__error"]}>
                                    Password is required!
                                </p>
                            )}
                        </div>

                        <div className={styles["form__actions"]}>
                            <input
                                className={
                                    emailError || passwordError
                                        ? styles["button-disabled"]
                                        : styles["button-submit"]
                                }
                                type="submit"
                                disabled={emailError || passwordError}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
