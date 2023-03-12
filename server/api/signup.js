const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const User = require('../user');

const router = express.Router();

router.use(bodyParser.json());

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send({ message: 'Les données d\'utilisateur sont manquantes.' });
    }

    try {
        // Vérifiez si l'utilisateur existe déjà
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).send({ message: 'Cet email est déjà utilisé.' });
        }

        // Créez un nouvel utilisateur
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        // Retournez une réponse réussie
        res.status(201).send({ message: 'Compte créé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erreur serveur lors de la création de compte.' });
    }
});

module.exports = router;
