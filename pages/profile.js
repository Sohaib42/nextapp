import { decodeToken } from '../utils';

function Profile() {
    // Récupérer le token JWT depuis le local storage
    const token = localStorage.getItem('token');

    // Décoder le token JWT pour obtenir les informations de l'utilisateur
    const { payload: user } = decodeToken(token);
    console.log(user);
    return (
        <div>
            <h1>Profil de {user.userName}</h1>
            <p>Email : {user.userEmail}</p>
            <p>Avatar : <img src={user.avatar} alt="Avatar de {user.username}" /></p>
            ...
        </div>
    );
}
export default Profile;
