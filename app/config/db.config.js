module.exports = {
    HOST: "localhost", // Hôte de la base de données MySQL
    USER: "root", // Nom d'utilisateur pour se connecter à la base de données
    PASSWORD: "motdepasse!", // Mot de passe pour se connecter à la base de données
    DB: "sawjwtdb", // Nom de la base de données
    dialect: "mysql", // Dialecte utilisé pour communiquer avec la base de données (dans ce cas, MySQL)
    pool: {
      max: 5, // Nombre maximum de connexions dans le pool de connexions
      min: 0, // Nombre minimum de connexions dans le pool de connexions
      acquire: 30000, // Temps maximum d'attente pour obtenir une connexion du pool (en millisecondes)
      idle: 10000 // Temps maximum d'inactivité d'une connexion avant qu'elle ne soit supprimée du pool (en millisecondes)
    }
  };
  