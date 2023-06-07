module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      id: {
        type: Sequelize.INTEGER, // Champ "id" de type entier
        primaryKey: true // Définir ce champ comme clé primaire de la table
      },
      name: {
        type: Sequelize.STRING // Champ "name" de type chaîne de caractères
      }
    });
  
    return Role;
  };
  