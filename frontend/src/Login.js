import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_AUTH_SERVICE_URL || 'http://localhost:4002'}/login`, {
                username,
                password
            });

            if (response.status === 200) {
                localStorage.setItem('username', username);
                navigate('/chat');
            }
        } catch (err) {
            setError(err.response?.data.message || "Erreur de connexion.");
        }
    };

    return (
        <div id="login-container">
            <h2 id="login-title">Connexion</h2>
            {error && <p id="login-error" style={{ color: 'red' }}>{error}</p>}
            <form id="login-form" onSubmit={handleLogin}>
                <input
                    id="login-username"
                    type="text"
                    placeholder="Pseudo"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control mb-3"
                />
                <input
                    id="login-password"
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control mb-3"
                />
                <button id="login-submit" type="submit" className="btn btn-primary">Se connecter</button>
            </form>
            <p>Pas encore de compte ? <a id="create-account-link" href="/register">Créer un compte</a></p>
        </div>
    );
}

export default Login;
