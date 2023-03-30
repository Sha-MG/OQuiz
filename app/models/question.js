const { DataTypes, Model } = require('sequelize');
const sequelizeConnexion = require('../database.js');

class Question extends Model {}

Question.init({
    text: DataTypes.STRING,
    anecdote: DataTypes.STRING,
    wiki: DataTypes.STRING,
    // level_id, answer_id, quiz_id: ce sont des clés étrangères
    // c'est géré dans models/index.js
}, {
    sequelize: sequelizeConnexion,
    tableName: 'question'
});

module.exports = Question;