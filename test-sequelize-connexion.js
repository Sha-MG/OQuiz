require('dotenv').config();
const sequelize = require('./app/database.js');

async function main() {
    // You can use the .authenticate() function to test if the connection is OK
    // (on a changé le contenu du fichier .env : Sequelize a besoin d'avoir les variables PG séparées et pas dans une PG_URL)
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();