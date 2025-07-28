import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; Secure; SameSite=Lax";
};

const eraseCookie = (name) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = getCookie('auth_token');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('YOUR_BACKEND_LOGIN_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed!');
            }

            const data = await response.json();
            const receivedToken = data.token;

            if (receivedToken) {
                setToken(receivedToken);
                setIsAuthenticated(true);
                setCookie('auth_token', receivedToken, 7);
                return true;
            } else {
                throw new Error('Backenddən token gəlmədi.');
            }
        } catch (error) {
            console.error('Login xətası:', error);
            setIsAuthenticated(false);
            setToken(null);
            eraseCookie('auth_token');
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await fetch('YOUR_BACKEND_REGISTER_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Qeydiyyat uğursuz oldu!');
            }

            const data = await response.json();
            const receivedToken = data.token;

            if (receivedToken) {
                setToken(receivedToken);
                setIsAuthenticated(true);
                setCookie('auth_token', receivedToken, 7);
                return true;
            } else {
                return true;
            }
        } catch (error) {
            console.error('Qeydiyyat xətası:', error);
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
        eraseCookie('auth_token');
    };

    const value = {
        token,
        isAuthenticated,
        loading,
        login,
        logout,
        register,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};