const config = require("../config/db.config.js"); // Importation de la configuration de la base de données depuis un fichier

const Sequelize = require("sequelize"); // Importation du module Sequelize
const sequelize = new Sequelize(
  config.DB, // Utilisation du nom de la base de données à partir de la configuration
  config.USER, // Utilisation du nom d'utilisateur à partir de la configuration
  config.PASSWORD, // Utilisation du mot de passe à partir de la configuration
  {
    host: config.HOST, // Utilisation de l'hôte à partir de la configuration
    dialect: config.dialect, // Utilisation du dialecte (par exemple, MySQL) à partir de la configuration
    operatorsAliases: false,

    pool: {
      max: config.pool.max, // Utilisation de la valeur maximale du pool de connexions à partir de la configuration
      min: config.pool.min, // Utilisation de la valeur minimale du pool de connexions à partir de la configuration
      acquire: config.pool.acquire, // Utilisation du temps maximum d'attente pour obtenir une connexion du pool à partir de la configuration
      idle: config.pool.idle // Utilisation du temps maximum d'inactivité d'une connexion avant qu'elle ne soit supprimée du pool à partir de la configuration
    }
  }
);

const db = {}; // Création d'un objet pour stocker les modèles de données et d'autres éléments liés à la base de données

db.Sequelize = Sequelize; // Ajout de Sequelize à l'objet db
db.sequelize = sequelize; // Ajout de l'instance de Sequelize à l'objet db

db.user = require("../models/user.model.js")(sequelize, Sequelize); // Importation et exécution du modèle User, en passant l'instance de Sequelize
db.role = require("../models/role.model.js")(sequelize, Sequelize); // Importation et exécution du modèle Role, en passant l'instance de Sequelize
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles", // Utilisation de la table de liaison "user_roles" pour établir la relation entre les rôles et les utilisateurs
  foreignKey: "roleId", // Utilisation de la clé étrangère "roleId" dans la table de liaison pour la relation des rôles
  otherKey: "userId" // Utilisation de la clé étrangère "userId" dans la table de liaison pour la relation des utilisateurs
});

db.user.belongsToMany(db.role, {
  through: "user_roles", // Utilisation de la table de liaison "user_roles" pour établir la relation entre les utilisateurs et les rôles
  foreignKey: "userId", // Utilisation de la clé étrangère "userId" dans la table de liaison pour la relation des utilisateurs
  otherKey: "roleId" // Utilisation de la clé étrangère "roleId" dans la table de liaison pour la relation des rôles
});

db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId', targetKey: 'id'
});
db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId', targetKey: 'id'
});

db.ROLES = ["user", "admin", "moderator"]; // Définition des rôles disponibles dans un tableau

module.exports = db; // Exportation de l'objet db pour être utilisé dans d'autres parties de l'application
