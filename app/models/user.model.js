module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      lastname: {
        type: Sequelize.STRING // Champ "lastname" de type chaîne de caractères
      },
      firstname: {
        type: Sequelize.STRING // Champ "firstname" de type chaîne de caractères
      },
      email: {
        type: Sequelize.STRING // Champ "email" de type chaîne de caractères
      },
      password: {
        type: Sequelize.STRING // Champ "password" de type chaîne de caractères
      }
    });
  
    return User;
  };
  