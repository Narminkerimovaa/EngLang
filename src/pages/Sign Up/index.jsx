import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';

import "./style.css";

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = useState(false);
    const [error, setError] = useState('');
    const { register} = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        setError('');
        if (password !== passwordAgain) {
            setError('Şifrələr uyğun gəlmir!');
            return;
        }

        try {
            const success = await register(name, email, password);
            if (success) {
                navigate('/login');
            } else {
                setError('Qeydiyyat zamanı gözlənilməyən xəta baş verdi.');
            }
        } catch (err) {
            setError(err.message || 'Qeydiyyat uğursuz oldu. Zəhmət olmasa, yenidən cəhd edin.');
            console.error('Qeydiyyat zamanı xəta:', err);
        }
    };

    return (
        <>
            <title>Sign Up Page</title>
            <div className="signup_container">
                <div className="signup_wrapper">
                    <div className="signup_form">
                        <div className="signup_content">
                            <h2>Sign up</h2>
                            <form onSubmit={handleRegister}>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
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
                                        <FaEyeSlash
                                            className="eye_icon"
                                            onClick={() => setShowPassword(false)}
                                        />
                                    ) : (
                                        <FaEye
                                            className="eye_icon"
                                            onClick={() => setShowPassword(true)}
                                        />
                                    )}
                                </div>

                                <div className="password_input_wrapper">
                                    <input
                                        type={showPasswordAgain ? "text" : "password"}
                                        name="password_again"
                                        id="password_again"
                                        placeholder="Password again"
                                        value={passwordAgain}
                                        onChange={(e) => setPasswordAgain(e.target.value)}
                                        required
                                    />
                                    {showPasswordAgain ? (
                                        <FaEyeSlash
                                            className="eye_icon"
                                            onClick={() => setShowPasswordAgain(false)}
                                        />
                                    ) : (
                                        <FaEye
                                            className="eye_icon"
                                            onClick={() => setShowPasswordAgain(true)}
                                        />
                                    )}
                                </div>

                                {error && <p className="error_message" style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>{error}</p>}

                                <button type="submit" className="signup_btn">Sign Up</button>
                            </form>

                            <div className="signup_signup">
                                <div>Have you an account ?</div>
                                <Link to={"/login"}>Login</Link>
                            </div>
                        </div>
                    </div>
                    <div className="signup_image"></div>
                </div>
            </div>
        </>
    );
}

export default SignUp;