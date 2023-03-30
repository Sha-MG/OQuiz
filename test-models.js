// on require dotenv
require("dotenv").config();

// on require nos models
const Tag = require('./app/models/tag.js');
const User = require('./app/models/user.js');
const Level = require('./app/models/level.js');

// on créer un objet tagCinema qui est une instance de la classe Tag
// = un objet créé à partir du "moule" Tag
const tagCinema = new Tag({
    id: 1, 
    name: "Cinéma"
});
// console.log(tagCinema);


// test user :
const userFetra = new User({
    id: 1, 
    firstname: "Fetra",
    lastname: "Oclock",
    email: "fetra@gmail.com",
    password: "aaa"
});
// console.log(userFetra.fullname);


// --------------- //
// première méthode Active Record : insert
// PROBLEMATIQUE :
// j'aimerai pouvoir créer un objet et dire à l'objet : enregistr toi enBDD !
// quelque chose comme ceci :
const levelBalaise = new Level({
    name: "Super balaise"
});
levelBalaise.insert(); // insert toi dans la BDD please !
// .insert = une méthide qui n'existe pas, et qu'il va falloir créer
// Objectif : créer une méthode insert dans la calsse Level, qui prends toutes les données et les insert en BDD


// deuxième méthode Active Record : getAll();
// PROBLEMATIQUE :
const nouveauLevel = new Level({
    name: "Nouveau niveau"
})
await nouveauLevel.insert(); // il faut await la méthode insert car elle est asynchrone
// on ne peut pas écrire "await" hors d'une fonction async
// => on va écrire un fichier plus propre pour tester notre modèle Level
// => Go to test-level.js
console.log(nouveauLevel);