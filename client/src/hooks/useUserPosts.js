import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UseCollection } from "./useCollection";
import * as postsService from "../services/postsService";
import { db } from "../firebase-config";
import { useAuth } from "./useAuth";
import { UseUser } from "./useUser";

export const useUserPosts = () => {
    const [posts, setPosts] = useState([]);
    const { uid } = useAuth();
    const currentUser = UseUser(uid);

    const userPosts = currentUser.posts;

    useEffect(() => {
        userPosts?.map((ref) => {
            postsService.getPost(ref).then((post) => {
                console.log(post)
            });
        });
    }, []);

    return posts
};
