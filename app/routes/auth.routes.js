const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    // Middleware pour gérer les en-têtes de requête et autoriser les en-têtes spécifiés
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Route pour l'inscription d'un nouvel utilisateur
    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail, // Vérification du nom d'utilisateur ou de l'email en double
            verifySignUp.checkRolesExisted, // Vérification de l'existence des rôles spécifiés
        ],
        controller.signup // Contrôleur pour gérer la logique d'inscription
    );

    // Route pour la connexion d'un utilisateur existant
    app.post("/api/auth/signin", controller.signin); // Contrôleur pour gérer la logique de connexion
    app.post("/api/auth/refreshtoken", controller.refreshToken);
};
