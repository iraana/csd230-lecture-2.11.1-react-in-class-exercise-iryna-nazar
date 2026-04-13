import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../provider/authProvider";
import api from "../api/axiosConfig";

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const isExpired = new URLSearchParams(location.search).get("expired");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { email, password });
            setToken(res.data.token);
            navigate("/");
        } catch (err) {
            setError("Invalid credentials. Try again.");
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ fontSize: '3rem', marginBottom: '30px' }}>Store Inventory</h1>

            {/* Layout Wrapper to keep Alert and Form together */}
            <div style={{ width: '100%', maxWidth: '400px' }}>

                {/* SESSION EXPIRED ALERT - Now stacks correctly */}
                {isExpired && (
                    <div style={alertStyle}>
                        ⚠️ Your session has expired. Please log in again.
                    </div>
                )}

                {/* LOGIN FORM */}
                <form onSubmit={handleLogin} className="admin-card" style={{ textAlign: 'left' }}>
                    {error && <p style={{ color: '#ef4444', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Username</label>
                        <input
                            placeholder="admin or user"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={inputStyle}
                        />
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Password</label>
                        <input
                            type="password"
                            placeholder="•••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={inputStyle}
                        />
                    </div>

                    <button type="submit" style={buttonStyle}>
                        LOG IN
                    </button>
                </form>
            </div>
        </div>
    );
};

// --- STYLES ---

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    padding: '20px'
};

const alertStyle = {
    background: '#f59e0b',
    color: '#000',
    padding: '15px',
    borderRadius: '12px',
    marginBottom: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
};

const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px'
};

const labelStyle = {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
};

const inputStyle = {
    width: '100%',
    boxSizing: 'border-box'
};

const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#6366f1', // Matching your Book theme color
    color: 'white',
    fontSize: '1rem',
    marginTop: '10px'
};

export default Login;