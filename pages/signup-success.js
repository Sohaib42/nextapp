import { useRouter } from 'next/router';

export default function SignupSuccess({ user }) {
    const router = useRouter();

    return (
        <>
            <h1>Inscription réussie !</h1>
            <p>Bienvenue sur notre plateforme, {user.username} !</p>
            <p>Votre adresse e-mail : {user.email}</p>
            <button onClick={() => router.push('/')}>Retour à la page d'accueil</button>
        </>
    );
}

export async function getServerSideProps(context) {
    try {
        const { user } = context.query;
        return { props: { user: JSON.parse(user) } };
    } catch (error) {
        console.error(error);
        return { props: { user: null } };
    }
}