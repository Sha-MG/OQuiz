const { DataTypes, Model } = require('sequelize');
const sequelizeConnexion = require('../database.js');

class Quiz extends Model {}

Quiz.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING
    // user_id : clé étrangère : c'est géré dans index.js
}, {
    sequelize: sequelizeConnexion,
    tableName: 'quiz'
});

module.exports = Quiz;