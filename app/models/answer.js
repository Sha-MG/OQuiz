const { DataTypes, Model } = require('sequelize');
const sequelizeConnexion = require('../database.js');

class Answer extends Model {}

Answer.init({
    text: DataTypes.STRING
    // question_id : clé étrangère
}, {
    sequelize: sequelizeConnexion,
    tableName: 'answer'
});

module.exports = Answer;