require('dotenv').config();

// je require mes models depuis le fichier index
// ainsi ils ont conaissance des associations qui les relient :
const { User, Quiz, Question, Level, Answer, Tag } = require('./app/models/index.js');

async function testQuizUser() {
    // const quiz = await Quiz.findByPk(1);
    // j'affichele titre que quiz d'id 1 :
    // console.log(quiz.title);
    // en suivant la relation qui existe dans db entre quiz et user,
    // j'aimerai pouvoir faire ceci : afficher le prénom de la personne qui a créé le quiz 
    // console.log(quiz.author);
    // ne marche toujours pas : pas défault Sequelize ne charge pas les relations (sinon il charegerait potentiellement beaucoup de données inutiles)
    // il faut donc lui préciser quelle relation on veut charger dans notr requpete, explicitement
    const quiz = await Quiz.findByPk(1, {
        include: ['author'], // on ajoute un seuxième paramèter : un objet de configuration
    });
    console.log(quiz.title);
    console.log(quiz.author);
    // là ça marche : on a demandé à Sequelize de récupérer le Quiz d'id 1 et l'user qui est lié à ce quiz

    // on teste l'association dans l'autre sens : 
    // cette fois-ci je cherche à récupérer un utilisateur et ses quiz
    const user = await User.findByPk(2, {
        include: ['quizList']
    });
    console.log(user.fullname);
    for (const quiz of user.quizList) {
        console.log(quiz.title);
    }
}

// testQuizUser();

async function testQuestionLevel() {
    // je veux récupérer la question d'id 1, ainsi que son level associé
    const question = await Question.findByPk(1, {
        include: ['Level'] // on n'a pas mis d'alias dans les associations (index.js), alors ici on précise le nom du model = le nom de la classe Level
    });
    // console.log(question);
    console.log(JSON.stringify(question, null, 2));
    // pour acccéder au level : 
    console.log(question.Level.name);

    
    // on teste dans l'autre sens : on demande un niveau, et toutes les questions qui y sont associées :
    const level = await Level.findByPk(2, {
        include: ['questions']
    });
    console.log(level.name);

    for (const question of level.questions) {
        console.log(question.text);
        console.log(question.id);
        // Dans le film Le Roi Lion, quel animal est Timon, le grand ami de Pumbaa ? => id: 11
        // TODO : on ira chercher la réponse à cette question quandon auré déterminé les associations entre Question et Answer !
    }

    // autre soluton que la boucle for pour afficher le tableau de questions :
    console.log(JSON.stringify(level, null, 2));

}

// testQuestionLevel();

async function testQuestionQuiz() {
    // je veux récupérer la question d'id 1, ainsi que le quiz auquel elle appartient
    const question = await Question.findByPk(1, {
        include: ['quiz'] 
    });
    console.log(JSON.stringify(question, null, 2));

    // on teste dans l'autre sens : on demande un quiz, et toutes les questions qui en font partie :
    const quizWithQuestions = await Quiz.findByPk(2, {
        include: ['questions']
    });
    console.log(JSON.stringify(quizWithQuestions, null, 2));

    // maintenant je voudrais le quiz, les questions et l'auteur dans la même response :
    const quizWithQuestionsAndAuthor = await Quiz.findByPk(2, {
        include: ['questions', 'author']
    });
    console.log(JSON.stringify(quizWithQuestionsAndAuthor, null, 2));
    // on peut récupérer plusieurs associations d'un coup !
    
}

// testQuestionQuiz();

async function testQuestionAnswer() {
    // récupérer une question, ses réponses possibles, et la bonne réponse :
    const question = await Question.findByPk(1, {
        include: ['answers', 'good_answer']
    });

    console.log(JSON.stringify(question, null, 2));

    // récupérer une réponse et la question à laquelle elle est liée
    const answer = await Answer.findByPk(1, {
        include: ['question']
    });

    console.log(JSON.stringify(answer, null, 2));
}

// testQuestionAnswer();

async function testQuizTag() {
    // je veux récupérer le quiz d'id 5 et les tags qui lui sont associés
    const quiz = await Quiz.findByPk(5, {
        include: ['tags']
    });

    console.log(JSON.stringify(quiz, null, 2));

    // je veux récupérer le tag d'id 3 et les quiz qui lui sont associés
    const tag = await Tag.findByPk(3, {
        include: ['quizList']
    });

    console.log(JSON.stringify(tag, null, 2));
    
    // associations transitives :
    // je voudrais récupérer un quiz (id = 5), avec ses questions, et pour chaque question, je voudraisle niveau de la question
    // Quiz -> Question -> Level
    const quizWithQuestions1 = await Quiz.findByPk(5, {
        include: ['questions']
    });
    // est équivalent à :
    const quizWithQuestions2 = await Quiz.findByPk(5, {
        include: [{
            association: "questions"
        }]
    });
    // et on ajoute le fait qu'on veut aussi les "levels" de chaque question :
    const quizWithQuestionsAndLevels = await Quiz.findByPk(5, {
        include: [
            {
                association: "questions", // on inclut les questions du quiz
                include: [{
                    association: 'Level' // et les niveaux des questions
                }],
            },
            {
                association: 'tags', // on inclut les tags du quiz
            }
        ]
    });

    // console.log(JSON.stringify(quizWithQuestionsAndLevels, null, 2));

    // on peut ajouter d'autres infos à notre requete pour avoir une réponse plus "fine " qui correspond mieux à ce dont on a besoin !
    const questions = await Question.findAll({
        order: [['text', 'ASC']], // on ordonne les questions dans l'ordre alphabetique de propriété "text"
        limit: 5, // on ne récupère que 5 résultats max
        attributes: ['text', "wiki"] // on ne garde que ces champs là dans la réponse
    });

    console.log(JSON.stringify(questions, null, 2));
}

testQuizTag();