import styles from "./assets/css/EditUser.module.css";
import { useContext, useState } from "react";
import * as userService from "../../../services/userService";
import { collection } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const EditUser = ({ editModeToggle }) => {
    const [name, setName] = useState("");
    const [profilePicUrl, setProfilePicUrl] = useState("");
    const [email, setEmail] = useState("");

    const [nameError, setNameError] = useState("");
    const [profilePicUrlError, setProfilePicUrlError] = useState("");
    const [emailError, setEmailError] = useState("");

    const navigate = useNavigate();

    const { update } = useAuth();

    const validateName = () => {
        if (!name) {
            setNameError(true);
        } else {
            setNameError(false);
        }
    };

    const validateProfilePicUrl = () => {
        if (!profilePicUrlError) {
            setProfilePicUrlError(true);
        } else {
            setProfilePicUrlError(false);
        }
    };

    const validateEmail = () => {
        if (!email) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    const userData = {
        name,
        profilePicUrl,
        email,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await update(email);
            await userService.updateUser(userData);
            editModeToggle();
            navigate("/profile");
        } catch (e) {
            console.error(e.message);
        }
    };

    return (
        <div className="shell">
            <div className={styles["form-box"]}>
                <form
                    action="PUT"
                    className={styles["form"]}
                    onSubmit={submitHandler}
                >
                    <div className={styles["form__head"]}>
                        <h1>Edit Profile</h1>
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
                        {nameError && (
                            <p className={styles["field__error"]}>
                                Profile Picture URL is required!
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
                                Email is required!
                            </p>
                        )}
                    </div>

                    <div className={styles["form__actions"]}>
                        <input
                            className="button submit"
                            type="submit"
                            // disabled={nameError || profilePicUrlError || emailError}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
