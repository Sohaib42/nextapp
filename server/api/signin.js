const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const User = require('../user');

const router = express.Router();

router.use(bodyParser.json());

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: 'Les données d\'utilisateur sont manquantes.' });
    }

    try {
        // Vérifiez si l'utilisateur existe déjà
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'L\'email ou le mot de passe est incorrect.' });
        }

        // Vérifiez si le mot de passe est correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).send({ message: 'L\'email ou le mot de passe est incorrect.' });
        }

        // Créez un jeton d'authentification
        const token = jwt.sign({ userId: user._id, userName: user.username, userEmail: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Retournez une réponse réussie avec le jeton d'authentification
        res.status(200).send({ message: 'Connexion réussie.', token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erreur serveur lors de la connexion.' });
    }
});

module.exports = router;
