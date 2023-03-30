const { DataTypes, Model } = require('sequelize');
const sequelizeConnexion = require('../database.js');

class Level extends Model {}

Level.init({
    name: DataTypes.STRING
}, {
    sequelize: sequelizeConnexion,
    tableName: 'level'
});

module.exports = Level;