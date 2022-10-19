import styles from "./assets/css/EditUser.module.css";
import { useContext, useState } from "react";
import * as userService from "../../../services/userService";
import { collection } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { UseUser } from "../../../hooks/useUser";

export const EditUser = ({ editModeToggle }) => {
    // const [name, setName] = useState("");
    // const [profilePicUrl, setProfilePicUrl] = useState("");
    // const [email, setEmail] = useState("");

    const [nameError, setNameError] = useState("");
    const [profilePicUrlError, setProfilePicUrlError] = useState("");
    const [emailError, setEmailError] = useState("");

    const [editProfileError, setEditProfileError] = useState("");

    const navigate = useNavigate();

    const { currentUser } = UseUser();

    const { update } = useAuth();

    const validateName = () => {
        if (!currentUser.name) {
            setNameError(true);
        } else {
            setNameError(false);
        }
    };

    const validateProfilePicUrl = () => {
        const pattern =
            /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|webp|avif|gif|svg)/;
        if (pattern.test(currentUser.profilePicUrl)) {
            setProfilePicUrlError(false);
        } else {
            setProfilePicUrlError(true);
        }
    };

    const validateEmail = () => {
        const pattern =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (pattern.test(currentUser.email)) {
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    };

    // const userData = {
    //     name,
    //     profilePicUrl,
    //     email,
    // };

    const submitHandler = async (e) => {
        e.preventDefault();
        const userData = Object.fromEntries(new FormData(e.target));
        try {
            await update(userData.email);
        } catch (error) {
            setEditProfileError(e.message);
            return;
        }
        await userService.updateUser(userData);
        editModeToggle();
        navigate("/profile");
    };

    return (
        <div className="shell">
            <header
                className="header"
                style={{
                    backgroundImage: `url(${currentUser.profilePicUrl})`,
                    height: `50%`,
                }}
            >
                <div
                    className="overlay"
                    style={{
                        background: `rgba(0, 0, 0, 0.4)`,
                    }}
                >
                    <h1 className="title">Update Profile</h1>
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
                        action="PUT"
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
                                defaultValue={currentUser.name}
                                onBlur={validateName}
                                required
                            />
                            {nameError && (
                                <p className={styles["field__error"]}>
                                    Full Name is required!
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <input
                                className={styles["form-control"]}
                                placeholder="Profile Picture URL"
                                id="profilePicUrl"
                                type="text"
                                name="profilePicUrl"
                                defaultValue={currentUser.profilePicUrl}
                                onBlur={validateProfilePicUrl}
                                required
                            />
                            {profilePicUrlError && (
                                <p className={styles["field__error"]}>
                                    Enter a valid Profile Picture URL!
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <input
                                className={styles["form-control"]}
                                placeholder="Email"
                                id="email"
                                type="email"
                                name="email"
                                defaultValue={currentUser.email}
                                onBlur={validateEmail}
                                required
                            />
                            {emailError && (
                                <p className={styles["field__error"]}>
                                    Enter a valid email address!
                                </p>
                            )}
                        </div>

                        <div className={styles["form__actions"]}>
                            <input
                                className={
                                    nameError ||
                                    profilePicUrlError ||
                                    emailError
                                        ? styles["button-disabled"]
                                        : styles["button-submit"]
                                }
                                type="submit"
                                disabled={
                                    nameError ||
                                    profilePicUrlError ||
                                    emailError
                                }
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
