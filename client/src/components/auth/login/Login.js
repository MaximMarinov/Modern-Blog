import styles from "./assets/css/Login.module.css";
import { useState } from "react";
import { UserAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate()

    const { signIn } = UserAuth();

    const validateEmail = () => {
        if (!email) {
            setEmailError(true);
        } else {
            setEmailError(false);
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
            console.log(e.message);
        }
    };

    return (
        <div className="shell">
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
                                Email is required!
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
