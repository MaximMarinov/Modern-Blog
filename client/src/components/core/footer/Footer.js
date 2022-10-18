import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <section id="contact" className="section has-img-bg pb-0">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-5 my-3">
                        <h6 className="mb-0">Phone</h6>
                        <p className="mb-4">+ 123-456-7890</p>

                        <h6 className="mb-0">Address</h6>
                        <p className="mb-4">12345 Fake ST NoWhere AB Country</p>

                        <h6 className="mb-0">Email</h6>
                        <p className="mb-0">info@website.com</p>
                        <p></p>
                    </div>
                    <div className="col-md-7">
                        <form>
                            <h4 className="mb-4">Drop Us A Line</h4>
                            <div className="form-row">
                                <div className="form-group col-sm-4">
                                    <input
                                        type="text"
                                        className="form-control text-white rounded-0 bg-transparent"
                                        name="name"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="form-group col-sm-4">
                                    <input
                                        type="email"
                                        className="form-control text-white rounded-0 bg-transparent"
                                        name="Email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="form-group col-sm-4">
                                    <input
                                        type="text"
                                        className="form-control text-white rounded-0 bg-transparent"
                                        name="subject"
                                        placeholder="Subject"
                                    />
                                </div>
                                <div className="form-group col-12">
                                    <textarea
                                        name="message"
                                        id=""
                                        cols="30"
                                        rows="4"
                                        className="form-control text-white rounded-0 bg-transparent"
                                        placeholder="Message"
                                    ></textarea>
                                </div>
                                <div className="form-group col-12 mb-0">
                                    <button
                                        type="submit"
                                        className="btn btn-warning rounded w-md mt-3"
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* Page Footer */}
                <footer className="mt-5 py-4 border-top border-secondary">
                    <p className="mb-0 small">
                        &copy;{" "}
                        <script>
                            document.write(new Date().getFullYear())
                        </script>
                        , LeadMark Created By{" "}
                        <a href="https://www.devcrud.com" target="_blank">
                            DevCrud.
                        </a>{" "}
                        All rights reserved{" "}
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
