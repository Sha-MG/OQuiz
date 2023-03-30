const { DataTypes, Model } = require('sequelize');
const sequelizeConnexion = require('../database.js');

class User extends Model {
    get fullname() {
        return `${this.firstname} ${this.lastname}`;
    }
}

// Nous on décrivait les champs à l'intérieur de la classe
// Sequelize, lui, veut qu'on lui décrire à l'extérieur, via une méthode qu'il nous fournit : la méthode "init"
// c'est une méthode static, donc on peut l'apeller sur User, la classe elle même 
// la classe User hérite de la méthode init, qui a été créée dans la classe Model (car User extends Model !) 

// on initialise notre model User : on définit les propriétés
// il faut passer 2 arguments à la méthode init :
//   - un objet avec la liste des champs
//   - un objet avec l'instance de la connexion, le nom de la table (et eventuellement le nom du modèle)
User.init({
    firstname: DataTypes.STRING,
    // version courte, pour : 
    // firstname: {
    //     type: DataTypes.STRING
    // },
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    // on peut ajouter d'autres options. On utilise alors la version avec un objet pour pouvoir passerp lusieurs options, comme ceci : 
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
    // pour l'id : on laisse Sequelize se débrouilller, il gère l'id
}, {
    // Other model options go here
    sequelize: sequelizeConnexion, // il faut passer ici l'instance de connexion à la database (qui nous vient du fichier database, require tout en haut)

    modelName: 'User', // We need to choose the model name (par default : prends le nom de la classe, donc ici pas vraiment utile)

    // Autre option : table name :  
    // Important : il faut aussi lui spécifier le nom de la table correspondante dans la database
    // pour le coup : par default il prends le nom de la classe, au pluriel !! ("users" au lieu de "user") 
    // voir la DOC ici : https://sequelize.org/docs/v6/core-concepts/model-basics/
    tableName: 'user'
})

// on exporte notre classe
module.exports = User;

// j'insiste sur le fait qu'il est impératif de s'aider de la DOC ! personne n'est supposé savoir faire ça de tête !!