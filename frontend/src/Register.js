import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';


function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas....");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:4001/register`,
                { username, password }
            );

            if (response.status === 201) {
                navigate('/login'); // Rediriger vers la page de connexion
            }
        } catch (err) {
            setError(err.response?.data.message || "Erreur lors de la création du compte.");
        }
    };

    return (
        <div id="register-container">
            <h2 id="register-title">Créer un compte</h2>
            {error && <p id="register-error" style={{ color: 'red' }}>{error}</p>}
            <form id="register-form" onSubmit={handleRegister}>
                <input
                    id="register-username"
                    type="text"
                    placeholder="Pseudo"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control mb-3"
                />
                <input
                    id="register-password"
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control mb-3"
                />
                <input
                    id="register-confirm-password"
                    type="password"
                    placeholder="Confirmez le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control mb-3"
                />
                <button id="register-submit" type="submit" className="btn btn-primary">Créer un compte</button>
            </form>
        </div>
    );
}

export default Register;
