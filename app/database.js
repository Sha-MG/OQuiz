// require Sequelize (il s'occupe lui même de require pg et de faire la connexion)
const { Sequelize } = require('sequelize');

// comme pour pg : on fait une nouvelle instance de Sequelize
const sequelize = new Sequelize({
    dialect: 'postgres', // le type de SGBD (système de gestion de base de donnée) qu'on utilise
    // config de la BDD dans le .env : lue automatiquement

    // On ajoute aussi cette option qui sert à désactiver une fonctionnalité par default de Sequelize
    // Par defaut, Sequelize s'attend à ce qu'il y ait dans notre BDD des champs "createdAt" et "updatedAt" pour chaque table
    // Nos tables n'ont pas ces champs, donc on désactive la fonctionnalité de Sequelize
    // les champs "createdAt" et "updatedAt" = les timestamps
    define: {
        timestamps: false
    },
});

// on exporte l'instance de sequelize
module.exports = sequelize