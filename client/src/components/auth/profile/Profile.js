import { useAuth } from "../../../hooks/useAuth";

export const Profile = () => {
    const { user } = useAuth();

    return (
        <h1>Hi, {user.email}</h1>
    )
}