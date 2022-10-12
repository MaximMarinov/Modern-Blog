import styles from "./assets/css/Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

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
            } else if (loginError === "Firebase: Error (auth/wrong-password).") {
                setLoginError("Wrong Password!");
            }
        }
    };

    return (
        <div className="shell">
            {loginError && (
                <p className={styles["field__error"]}>{loginError}</p>
            )}

            <div className={styles["form-box"]}>
                <form
                    action="POST"
                    className={styles["form"]}
                    onSubmit={submitHandler}
                >
                    <div className={styles["form__head"]}>
                        <h1>Sign In</h1>
                    </div>

                    <label className={styles["form__label"]} htmlFor="Email">
                        Email
                    </label>
                    <div className={styles["field"]}>
                        <input
                            id="email"
                            type="email"
                            name="email"
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

                    <label className={styles["form__label"]} htmlFor="password">
                        Password
                    </label>
                    <div className={styles["field"]}>
                        <input
                            id="password"
                            type="password"
                            name="password"
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
                            className="button submit"
                            type="submit"
                            disabled={emailError || passwordError}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
