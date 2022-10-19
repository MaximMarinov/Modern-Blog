import styles from "./assets/css/Register.module.css";
import { useState } from "react";
import * as userService from "../../../services/userService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import registerImage from "./assets/images/register.jpg";

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

            <header
                className="header"
                style={{
                    height: `50%`,
                    background: `url(${registerImage})`,
                }}
            >
                <div
                    className="overlay"
                    style={{ background: `rgba(0, 0, 0, 0.3)` }}
                >
                    <h1 className="title">Sign Up</h1>
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
                        <div className="form-group">
                            <input
                                className={styles["form-control"]}
                                placeholder="Full Name"
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

                        <div className={"form-group"}>
                            <input
                                placeholder="Profile Picure URL"
                                id="profilePicUrl"
                                type="text"
                                name="profilePicUrl"
                                onChange={(e) =>
                                    setProfilePicUrl(e.target.value)
                                }
                                value={profilePicUrl}
                                onBlur={validateProfilePicUrl}
                                className={styles["form-control"]}
                                required
                            />
                            {profilePicUrlError && (
                                <p className={styles["field__error"]}>
                                    Enter a valid Profile Picture URL!
                                </p>
                            )}
                        </div>

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

                        <div className={"form-group"}>
                            <input
                                placeholder="Repeat Password"
                                className={styles["form-control"]}
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
                                className={
                                    emailError ||
                                    passwordError ||
                                    rePassError
                                        ? styles["button-disabled"]
                                        : styles["button-submit"]
                                }
                                type="submit"
                                disabled={
                                    emailError || passwordError || rePassError
                                }
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
