const mongoose = require('mongoose');

require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Veuillez définir la variable d\'environnement MONGODB_URI dans votre fichier .env'
    );
}

async function dbConnect() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log("Connected to databse");
        })
        console.log("Success?");
    } catch (error) {
        console.log('Erreur de connexion à la base de données:', error.message);
    }
}

module.exports = dbConnect;
