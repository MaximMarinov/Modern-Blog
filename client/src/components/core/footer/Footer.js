import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <section id="contact" className="section has-img-bg pb-0">
            <div className="container">
                {/* Page Footer */}
                <footer className="mt-5 py-4 border-top border-secondary">
                    <p className="mb-0 small">
                        &copy; Modern Blog | All rights reserved.
                    </p>
                </footer>
                {/* End of Page Footer */}
            </div>
        </section>
    );
};
{
    /* <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <p>
                            Copyright &copy; 2022{" "}
                            <Link to="/">Modern Blog</Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer> */
}
