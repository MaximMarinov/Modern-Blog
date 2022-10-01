import "./App.css";
import { Header } from "./components/core/header/Header";
import { Footer } from "./components/core/footer/Footer";
import { Home } from "./components/home/Home";
import { Routes, Route } from "react-router-dom";
import { TopicsList } from "./components/posts/topics-list/TopicsList";
import { IdeasList } from "./components/posts/ideas-list/IdeasList";
import { ResearchList } from "./components/posts/research-list/ResearchList";
import { PostDetails } from "./components/posts/post-details/PostDetails";
import { CreatePost } from "./components/posts/create-post/CreatePost";
import { EditPost } from "./components/posts/edit-post/EditPost";
import { Login } from "./components/auth/login/Login";
import { Register } from "./components/auth/register/Register";

function App() {
    return (
        <div className="App">
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/topics/" element={<TopicsList />} />
                <Route
                    path="/topics/:postId"
                    element={<PostDetails collection={"topics"} />}
                />

                <Route path="/ideas" element={<IdeasList />} />
                <Route
                    path="/ideas/:postId"
                    element={<PostDetails collection={"ideas"} />}
                />

                <Route path="/research" element={<ResearchList />} />
                <Route
                    path="/research/:postId"
                    element={<PostDetails collection={"research"} />}
                />

                <Route path="/create" element={<CreatePost />} />

                <Route path="/edit/:collectionRef/:postId" element={<EditPost />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
