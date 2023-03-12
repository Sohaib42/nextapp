import React, { useState } from 'react';
import { useRouter } from 'next/router';

function SignupForm() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Soumettre les données d'inscription à l'API
        const response = await fetch('http://localhost:3080/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            // Rediriger l'utilisateur vers la page de confirmation d'inscription
            router.push('/');
        } else {
            // Afficher un message d'erreur si l'inscription a échoué
            alert('L\'inscription a échoué. Veuillez réessayer.');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nom d'utilisateur:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
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
            <button type="submit">S'inscrire</button>
        </form>
    );
}

export default SignupForm;
