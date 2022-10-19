import { Link } from "react-router-dom";
import styles from "./assets/css/SinglePost.module.css";

export const SinglePost = ({ post }) => {
    return (
        <>
            <figure>
                <img className="card-img" src={post.imageUrl} alt="" />
            </figure>
            <div className="card-body">
                <small className="text-primary font-weight-bold">
                    {post.author}
                </small>
                <h5 className="card-title mt-3">{post.title}</h5>
                <p className="mb-0">{post.content}</p>
            </div>
        </>
    );
};
