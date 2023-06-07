const jwt = require("jsonwebtoken"); // Importation du module jsonwebtoken pour gérer les tokens JWT
const config = require("../config/auth.config.js"); // Importation de la configuration des paramètres d'authentification depuis le fichier auth.config.js
const db = require("../models"); // Importation de l'objet db depuis le dossier des modèles
const User = db.user; // Récupération du modèle User à partir de l'objet db

const { TokenExpiredError } = jwt;

catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res
            .status(401)
            .send({ message: "Unauthorized! Access Token was expired!" });
    }

    return res.sendStatus(401).send({ message: "Unauthorized!" });
};

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};

xsrfToken = (req, res, next) => {
    let token = req.headers["x-xsrf-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        // Recherche de l'utilisateur correspondant à l'identifiant d'utilisateur dans la base de données
        user.getRoles().then((roles) => {
            // Récupération des rôles de l'utilisateur
            for (let i = 0; i < roles.length; i++) {
                // Parcours des rôles de l'utilisateur
                if (roles[i].name === "admin") {
                    // Si le rôle de l'utilisateur est "admin"
                    next(); // Passe à l'étape suivante
                    return;
                }
            }

            res.status(403).send({
                message: "Require Admin Role!", // Renvoi d'une réponse d'erreur indiquant que le rôle administrateur est requis
            });
            return;
        });
    });
};

isModerator = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        // Recherche de l'utilisateur correspondant à l'identifiant d'utilisateur dans la base de données
        user.getRoles().then((roles) => {
            // Récupération des rôles de l'utilisateur
            for (let i = 0; i < roles.length; i++) {
                // Parcours des rôles de l'utilisateur
                if (roles[i].name === "moderator") {
                    // Si le rôle de l'utilisateur est "moderator"
                    next(); // Passe à l'étape suivante
                    return;
                }
            }

            res.status(403).send({
                message: "Require Moderator Role!", // Renvoi d'une réponse d'erreur indiquant que le rôle modérateur est requis
            });
        });
    });
};

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        // Recherche de l'utilisateur correspondant à l'identifiant d'utilisateur dans la base de données
        user.getRoles().then((roles) => {
            // Récupération des rôles de l'utilisateur
            for (let i = 0; i < roles.length; i++) {
                // Parcours des rôles de l'utilisateur
                if (roles[i].name === "moderator") {
                    // Si le rôle de l'utilisateur est "moderator"
                    next(); // Passe à l'étape suivante
                    return;
                }

                if (roles[i].name === "admin") {
                    // Si le rôle de l'utilisateur est "admin"
                    next(); // Passe à l'étape suivante
                    return;
                }
            }

            res.status(403).send({
                message: "Require Moderator or Admin Role!", // Renvoi d'une réponse d'erreur indiquant que le rôle modérateur ou administrateur est requis
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin,
};

module.exports = authJwt; // Exportation de l'objet authJwt contenant les fonctions de vérification d'authentification

