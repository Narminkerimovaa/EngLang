import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./../../context/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import google from "./../../assets/google.png";
import facebook from "./../../assets/facebook.png";
import "./style.css";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const success = await login(email, password);

            if (success) {
                navigate('/dashboard');
            } else {
                setError('Unknown login error occurred.');
            }
        } catch (err) {
            console.error('Login Error:', err);
            setError(err.message || 'Login failed! Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <title>Login Page</title>
            <div className="container">
                <div className="login_wrapper">
                    <div className="login_image"></div>
                    <div className="login_form">
                        <div className="login_content">
                            <h2>Login</h2>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <div className="password_input_wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    {showPassword ? (
                                        <FaEyeSlash className="eye_icon" onClick={togglePasswordVisibility} />
                                    ) : (
                                        <FaEye className="eye_icon" onClick={togglePasswordVisibility} />
                                    )}
                                </div>

                                <div className="login_remember">
                                    <div className="login_remember_left">
                                        <input type="checkbox" id="remember" />
                                        <label htmlFor="remember">Remember me</label>
                                    </div>
                                    <Link to="#">Forgot password?</Link>
                                </div>

                                <button
                                    className="login_btn"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                            </form>

                            <div className="login_another_way">
                                <div className="hr_line"></div>
                                or
                                <div className="hr_line"></div>
                            </div>

                            <div className="login_another_icons">
                                <img src={google} alt="google" />
                                <img src={facebook} alt="facebook" />
                            </div>

                            <div className="login_signup">
                                <div>Don’t have an account ?</div>
                                <Link to={"/register"}>Sign up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;