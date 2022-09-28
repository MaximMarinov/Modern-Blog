import "./App.css";
import { Header } from "./components/core/header/Header";
import { Footer } from "./components/core/footer/Footer";
import { Home } from "./components/home/Home";

function App() {
    return (
        <div className="App">
            <Header />
            <Home />
            <Footer />
        </div>
    );
}

export default App;
