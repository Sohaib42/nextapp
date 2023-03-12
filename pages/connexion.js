import React, { useState } from 'react';
import { useRouter } from 'next/router';

function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Soumettre les données de connexion à l'API
        const response = await fetch('http://localhost:3080/api/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('token', token);

            // Rediriger l'utilisateur vers la page de profil
            router.push('/profile');
        } else {
            // Afficher un message d'erreur si les informations d'identification sont invalides
            alert('Les informations d\'identification sont invalides. Veuillez réessayer.');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Mot de passe:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Se connecter</button>
        </form>
    );
}

export default LoginForm;
