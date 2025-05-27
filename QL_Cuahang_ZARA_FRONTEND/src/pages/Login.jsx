import { useState } from "react";
import { login } from "../services/LoginService";
import myImage from '../assets/images/image-small-0808d3d9-9032-4491-b28b-115af99fb0ab-default_0.jpg';
import { useNavigate } from "react-router-dom";
import Logo1 from '../assets/svg/logo1.svg';
import '../styles/Login.scss';

function Login() {
    const [email, setEmail] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted with email:", email, "and password:", matKhau);

        setLoading(true);
        setMessage(null);

        try {
            const token = await login(email, matKhau);
            console.log("Token received:", token);
            if (!token) {
                throw new Error("Token is undefined or null");
            }
            localStorage.setItem("token", token);
            window.dispatchEvent(new Event('userChanged'));

            setMessage("Login successful!");
            console.log("Navigate called");
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            setMessage(error.message || "Login failed");
        }
    };

    return (
        <div className="login-page">
            <div className="form-login">
                <a href="/"><img src={Logo1} alt="" /></a>
                <form onSubmit={handleSubmit} method="POST">
                    <h2 className="uppercase font-bold mt-4 text-2xl">LOG IN</h2>
                    <div className="login-form-body">
                        <div>
                            <div className="input-group">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder=" "
                                />
                                <label htmlFor="email">EMAIL</label>
                            </div>
                        </div>
                        <div>
                            <div className="input-group">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={matKhau}
                                    onChange={(e) => setMatKhau(e.target.value)}
                                    placeholder=" "
                                />
                                <label htmlFor="password">PASSWORD</label>
                            </div>
                        </div>
                        <div>
                            <div>
                                <a href="#" className="recovery-password-link">
                                    Have you forgotten your password?
                                </a>
                            </div>
                        </div>

                    </div>
                    <div>
                        <button type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "LOG IN"}
                        </button>
                    </div>
                </form>
            </div>
            <div className="img-login">
                <img className="logon-image" src={myImage} alt="" />
            </div>
        </div>

    );
}

export default Login;
