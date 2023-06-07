const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./app/models"); // Importation de l'objet db depuis le fichier models/index.js
const Role = db.role; // Importation du modèle Role depuis le fichier models/role.model.js

db.sequelize.sync({force: true}).then(() => { // Synchronisation de la base de données avec les modèles et les relations
    console.log('Drop and Resync Db');
    initial();
});

// Configuration des options CORS
var corsOptions = {
    origin: "http://localhost:8081", // Autoriser les requêtes provenant de cette URL
};

app.use(cors(corsOptions)); // Utilisation du middleware CORS pour gérer les requêtes cross-origin

// Analyser les requêtes avec le type de contenu - application/json
app.use(express.json());

// Analyser les requêtes avec le type de contenu - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Route simple
app.get("/", (req, res) => {
    res.json({ message: `Bienvenue dans l'application.` }); // Répondre avec un message JSON
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// Définir le port et écouter les requêtes
const PORT = process.env.PORT || 8080; // Utiliser le port spécifié dans l'environnement ou le port 8080 par défaut
app.listen(PORT, () => {
    console.log(`Le serveur s'exécute sur le port ${PORT}.`);
});

function initial() {
    Role.create({ // Création d'un rôle "user"
        id: 1,
        name: "user"
    });

    Role.create({ // Création d'un rôle "moderator"
        id: 2,
        name: "moderator"
    });

    Role.create({ // Création d'un rôle "admin"
        id: 3,
        name: "admin"
    });
}