exports.allAccess = (req, res) => {
    res.status(200).send("Public Content."); // Réponse réussie avec le contenu public
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content."); // Réponse réussie avec le contenu utilisateur
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content."); // Réponse réussie avec le contenu administrateur
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content."); // Réponse réussie avec le contenu modérateur
};
