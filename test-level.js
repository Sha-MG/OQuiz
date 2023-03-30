// on require dotenv
require("dotenv").config();
// on require notre classe Level
const Level = require('./app/models/level.js');

// fonction acynchrone qui pourra await
async function main() {
    // INSERT
    // insérer un nouvau niveau
    // je crée une instance de la classe Level
    const nouveauLevel = new Level({ name: "Hero"});
    // j'utilise la méthode insert pour insérer mon nouveau niveau dans la BDD
    await nouveauLevel.insert();
    // console.log(nouveauLevel);

    // FIND ALL 
    // récupérer tous les niveaux de la BDD
    const levels = await Level.findAll(); // findAll est une méthode statique, on l'apelle sur la classe elle même, pas sur une instance de la classe
    console.log(levels);

    // UPDATE
    // mettre à jour un niveau
    nouveauLevel.name = "Heroïc";
    await nouveauLevel.update();
    console.log(nouveauLevel);

    // DELETE
    await nouveauLevel.delete();
    // on vérifie :
    console.log(await Level.findAll());
}

main();

