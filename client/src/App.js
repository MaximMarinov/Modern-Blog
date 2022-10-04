import "./App.css";
import { Header } from "./components/core/header/Header";
import { Footer } from "./components/core/footer/Footer";
import { Home } from "./components/pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { PostList } from "./components/posts/PostLists";
import { PostDetails } from "./components/posts/post-details/PostDetails";
import { CreatePost } from "./components/posts/create-post/CreatePost";
import { EditPost } from "./components/posts/edit-post/EditPost";
import { Login } from "./components/auth/login/Login";
import { Register } from "./components/auth/register/Register";
import { NotFound } from "./components/pages/not-found/NotFound";

function App() {
    return (
        <div className="App">
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/posts/:collectionPath" element={<PostList />} />
                <Route
                    path="/topics/:postId"
                    element={<PostDetails collection={"topics"} />}
                />

                <Route
                    path="/ideas/:postId"
                    element={<PostDetails collection={"ideas"} />}
                />

                <Route
                    path="/research/:postId"
                    element={<PostDetails collection={"research"} />}
                />

                <Route path="/create" element={<CreatePost />} />

                <Route
                    path="/edit/:collectionRef/:postId"
                    element={<EditPost />}
                />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/*" element={<NotFound />} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
