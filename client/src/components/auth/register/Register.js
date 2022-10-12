import styles from "./assets/css/Register.module.css";
import { useContext, useState } from "react";
import * as userService from "../../../services/userService";
import { collection } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const Register = () => {
    const [name, setName] = useState("");
    const [profilePicUrl, setProfilePicUrl] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePass, setRePass] = useState("");

    const [nameError, setNameError] = useState("");
    const [profilePicUrlError, setProfilePicUrlError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [rePassError, setRePassError] = useState("");

    const [registerError, setRegisterError] = useState("");

    const navigate = useNavigate();

    const { signUp } = useAuth();

    const validateName = () => {
        if (!name) {
            setNameError(true);
        } else {
            setNameError(false);
        }
    };

    const validateProfilePicUrl = () => {
        const pattern =
            /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|webp|avif|gif|svg)/;
        if (pattern.test(profilePicUrl)) {
            setProfilePicUrlError(false);
        } else {
            setProfilePicUrlError(true);
        }
    };

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

    const validateRePass = () => {
        if (rePass != password) {
            setRePassError(true);
        } else {
            setRePassError(false);
        }
    };

    const userData = {
        name,
        profilePicUrl,
        email,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password === rePass) {
            try {
                await signUp(email, password);
                await userService.registerUser(userData);
                navigate("/profile");
            } catch (e) {
                setRegisterError(e.message);
            }
        }
    };

    return (
        <div className="shell">
            {registerError && (
                <p className={styles["field__error"]}>{registerError}</p>
            )}

            <div className={styles["form-box"]}>
                <form
                    action="POST"
                    className={styles["form"]}
                    onSubmit={submitHandler}
                >
                    <div className={styles["form__head"]}>
                        <h1>Sign Up</h1>
                    </div>

                    <label className={styles["form__label"]} htmlFor="name">
                        Full Name
                    </label>
                    <div className={styles["field"]}>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            onBlur={validateName}
                            required
                        />
                        {nameError && (
                            <p className={styles["field__error"]}>
                                Full Name is required!
                            </p>
                        )}
                    </div>

                    <label
                        className={styles["form__label"]}
                        htmlFor="profilePicUrl"
                    >
                        Profile Picture URL
                    </label>
                    <div className={styles["field"]}>
                        <input
                            id="profilePicUrl"
                            type="text"
                            name="profilePicUrl"
                            onChange={(e) => setProfilePicUrl(e.target.value)}
                            value={profilePicUrl}
                            onBlur={validateProfilePicUrl}
                            required
                        />
                        {profilePicUrlError && (
                            <p className={styles["field__error"]}>
                                Enter a valid Profile Picture URL!
                            </p>
                        )}
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

                    <label className={styles["form__label"]} htmlFor="rePass">
                        Repeat Password
                    </label>
                    <div className={styles["field"]}>
                        <input
                            id="rePass"
                            type="password"
                            name="rePass"
                            onChange={(e) => setRePass(e.target.value)}
                            value={rePass}
                            onBlur={validateRePass}
                            required
                        />
                        {rePassError && (
                            <p className={styles["field__error"]}>
                                Passwords don't match!
                            </p>
                        )}
                    </div>

                    <div className={styles["form__actions"]}>
                        <input
                            className="button submit"
                            type="submit"
                            disabled={
                                emailError || passwordError || rePassError
                            }
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
