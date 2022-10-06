import { UserAuth } from "../../../contexts/AuthContext";

export const Profile = () => {
    const { user } = UserAuth();

    return (
        <h1>Hi, {user.email}</h1>
    )
}