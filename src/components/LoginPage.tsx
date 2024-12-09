import React, { useState } from "react";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Inicio de sesión exitoso');
        } catch (loginError: any) {
            setError('Error al iniciar sesión:' + loginError.message);
        }
    };

    return (
        <div className="login-page">
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input 
                     type="email"
                     id="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input 
                     type="password"
                     id="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default LoginPage;