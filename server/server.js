const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const dbConnect = require('./db');
const cors = require('cors');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const MONGODB_URI = process.env.MONGODB_URI;

const server = express();

// Connexion à la base de données MongoDB
dbConnect();
server.use(cors({ origin: 'http://localhost:3000' }));
// Configuration des routes API
const signupRouter = require('./api/signup');
server.use('/api/signup', signupRouter);

const signinRouter = require('./api/signin');
server.use('/api/signin', signinRouter);

// Gestion de toutes les autres requêtes avec Next.js
server.all('*', (req, res) => {
    return handle(req, res);
});

// Démarrer le serveur
server.listen(3080, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3080');
});
