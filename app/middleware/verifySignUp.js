const db = require("../models"); // Importation de l'objet db depuis le dossier des modèles
const ROLES = db.ROLES; // Récupération des rôles disponibles à partir de l'objet db
const User = db.user; // Récupération du modèle User à partir de l'objet db

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Vérification du nom d'utilisateur en doublon
    // Vérification de l'e-mail en doublon
    User.findOne({
        where: {
            email: req.body.email // Recherche d'un utilisateur avec la même adresse e-mail dans la base de données
        },
    }).then((user) => {
        if (user) {
            // Si un utilisateur avec la même adresse e-mail est trouvé
            res.status(400).send({
                message: "Failed! Email is already in use!", // Renvoi d'une réponse d'erreur indiquant que l'adresse e-mail est déjà utilisée
            });
            return;
        }

        next(); // Si aucun nom d'utilisateur ni adresse e-mail en doublon n'est trouvé, passe à l'étape suivante
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                // Vérification de l'existence des rôles spécifiés dans la requête
                res.status(400).send({
                    message:
                        "Failed! Role does not exist = " + req.body.roles[i], // Renvoi d'une réponse d'erreur indiquant que le rôle spécifié n'existe pas
                });
                return;
            }
        }
    }

    next(); // Si tous les rôles existent, passe à l'étape suivante
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp; // Exportation de l'objet verifySignUp contenant les fonctions de vérification
