require('dotenv').config();

// on require nos models
const User = require('./app/models/user.js');
const Level = require('./app/models/level.js');
const Question = require('./app/models/question.js');


async function testUser() {
    // on teste notre nouveau model User
    // findAll 
    // toujours des méthodes async, puisqu'on communique avec la db, donc tjounrs async/await
    const users = await User.findAll({ raw: true });
    // Youpi ! Il execute bien la bonne requête : je récupère tous les users de la table user ! je n'ai pas eu besoin d'écrire la méthode findAll, tout a été fait pour nous : merci Sequelize ! 

    // option { raw: true } : pour voir seulement les data de la BDD, sans modèle d'entité sequelize autour : pour que soit plus clean à lire dansle console.log
    console.log(users);

    // si on fait User. => on a lautocomplete qui nous propose toutes les méthodes dispo !!! Fonctionnalité pour Clémence !! :) 
    // findByPk = primary Key (donc l'id !)
    const user = await User.findByPk(3, { raw: true }); // là aussi on peut passer l'option raw: true
    console.log(user);

    // on teste le DESTROY 
    await User.destroy({
        where: {
          id: 10
        }
    });

    // on teste le SAVE
    const mikaUser = new User({
        firstname: "Mika",
        lastname: "Oclock",
        email: "mikamika@oclock.com",
        password: "mikachu"
    });
    await mikaUser.save();

    // ou équivalent avec la méthode Create : 
    /*User.create({
        firstname: "Mika",
        lastname: "Oclock",
        email: "mikamika@oclock.com",
        password: "mikachu"
    })*/

    const usersAfterDestroy = await User.findAll({ raw: true });
    console.log(usersAfterDestroy);
}

// testUser();

async function testLevel() {
    // Créer un Level avec le nom "méga difficile" et l'insérer en BDD
    await Level.create({ name: "méga difficile" });
    // .create s'occupe de crer une instance de la classe Level avec les données qu'on lui fournit, et de l'enregistrer en bd.
    // autre option on peut aussi faire un .build, puis un .save (voir dans la DOC)
    // ou encore : créer une instance de la classe Level à la main (avec new), puis l'enregistrer en db avec .save 

    const levels = await Level.findAll({ raw: true });
    console.log(levels);

}

testLevel();

async function testQuestion() {
    // trouver toutes les questions
    const questions = await Question.findAll({ 
        raw: true,
        limit: 30 // on limite le nombre de résultats car il y a beaucoup de questions dans la db
    });
    // console.log(questions);

    // Trouver la question dont l'id est 5
    const questionNum5 = await Question.findByPk(5);
    console.log(questionNum5);
    // on pourrait se demander : est-ce que l'objet question ici est juste un objet, ou bien c'est une instance de la classe Question ?
    // pour vérifier : on peut utiliser instanceof
    console.log(questionNum5 instanceof Question);
}

// testQuestion();
