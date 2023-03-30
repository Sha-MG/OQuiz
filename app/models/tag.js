const { DataTypes, Model } = require('sequelize');
const sequelizeConnexion = require('../database.js');

class Tag extends Model {}

Tag.init({
    name: DataTypes.STRING
}, {
    sequelize: sequelizeConnexion,
    tableName: 'tag'
});

module.exports = Tag;