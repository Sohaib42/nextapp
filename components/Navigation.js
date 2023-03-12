import { parseJwt } from '../utils';
import Link from 'next/link';

function Navigation() {
    const token = localStorage.getItem('token');

    const user = token ? parseJwt(token) : null;

    return (
        <div>
            <nav>
                <ul className="navbar">
                    <li className="nav-item">
                        <Link href="/">Accueil</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/a-propos">À propos</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/contact">Contact</Link>
                    </li>
                    {user ? (
                        <li className="nav-item auth">
                            <span>Bienvenue, {user.userName}!</span>
                        </li>
                    ) : (
                        <li className="nav-item auth">
                            <Link href="/connexion">Connexion</Link>
                            <span> / </span>
                            <Link href="/inscription">Créer un compte</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;
