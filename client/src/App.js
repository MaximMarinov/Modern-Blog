import "./index.css";
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
import { Profile } from "./components/auth/profile/Profile";
import { AuthContextProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/routes/PrivateRoute";

function App() {
    return (
        <AuthContextProvider>
            <div className="App">
                <Header />

                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route
                        path="/posts/:collectionPath"
                        element={<PostList />}
                    />

                    <Route element={<PrivateRoute />}>
                        <Route
                            path="/posts/:collectionPath/:postId"
                            element={<PostDetails />}
                        />

                        <Route path="/create" element={<CreatePost />} />

                        <Route
                            path="/edit/:collectionPath/:postId"
                            element={<EditPost />}
                        />
                    </Route>

                    <Route path="/login" element={<Login />} />

                    <Route path="/register" element={<Register />} />

                    <Route path="/profile" element={<Profile />} />

                    <Route path="/*" element={<NotFound />} />
                </Routes>

                <Footer />
            </div>
        </AuthContextProvider>
    );
}

export default App;
