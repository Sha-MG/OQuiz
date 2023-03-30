// Ce fichier sert à déclarer à Sequelize les relations entre les modèles

// on importe les models
const Quiz = require("./quiz.js");
const User = require("./user.js");
const Question = require("./question.js");
const Level = require("./level.js");
const Tag = require("./tag.js");
const Answer = require("./answer.js");
const { belongsTo } = require("./quiz.js");

// ** Association USER/QUIZ ** //

// un utilisateur possède plusieurs quiz (maximum) (1,N)
User.hasMany(Quiz, {
    foreignKey: 'user_id', // le nom de la clé étrangère qui fait le lien entre les 2
    as: 'quizList' // je donne un petit nom à ma relation (un alias)
    // je pourrais alors faire user.quizList pour récupérer les quis d'un utilisateur !
}); 
// un quiz appartient à UN user (maximum) (1,1)
Quiz.belongsTo(User, {
    foreignKey: 'user_id', // qu'on lise la relation dans un sens ou dans l'autre, c'est cette clé qui fait le lien entre les 2 tables !
    as: 'author'
}); 


// ** Association QUESTION/LEVEL ** //

// une question appartient à 1 niveau
Question.belongsTo(Level,{
    foreignKey: 'level_id'
    // si on ne précise pas d'alias, le niveau associé à la question sera apellé "Level", comme la classe
});
// un niveau concerne plusieurs question
Level.hasMany(Question, {
    foreignKey: 'level_id',
    as: 'questions'
});


// ** Association QUESTION/QUIZ ** //

// Un quiz possède plusieurs questions
Quiz.hasMany(Question, {
    foreignKey: 'quiz_id',
    as: 'questions'
});
// une question appartient à un seul quiz
Question.belongsTo(Quiz, {
    foreignKey: 'quiz_id',
    as: 'quiz'
});


// ** Association QUESTION/ANSWER ** //

// LIEN ENTRE 1 QUESTION ET PLUSIEURS REPONSES POSSIBLES 
// une question possède plusieurs réponses possibles (0,N)
Question.hasMany(Answer, {
    foreignKey: 'question_id',
    as: 'answers'
});
// une réponse est liée à une seule question :
Answer.belongsTo(Question, {
    foreignKey: 'question_id',
    as: 'question'
});

// ATTENTION cas particulier : Question et Answer sont liés de 2 manières différentes

// LIEN ENTRE 1 QUESTION ET 1 BONNE REPONSE
// une question possède 1 et 1 seule BONNE réponse
Question.belongsTo(Answer, {
    foreignKey: 'answer_id',
    as: 'good_answer'
});


// ** Association QUIZ/TAG ** //
// ici on a une relation particulière : N <-> N
// un quiz a plusieurs tags
Quiz.belongsToMany(Tag, {
    through: 'quiz_has_tag', // "via" quelle table de liaison sont liées les deux tables
    foreignKey: 'quiz_id', // le nom de la clé de Quiz dans la table de liaison
    otherKey: 'tag_id', // le nom de l'"autre" clé : donc le tag
    as: 'tags'
});
// un tag a plusieurs quiz
Tag.belongsToMany(Quiz, {
    through: 'quiz_has_tag', // "via" quelle table de liaison sont liées les deux tables
    foreignKey: 'tag_id', // le nom de la clé de Tag dans la table de liaison
    otherKey: 'quiz_id', // le nom de l'"autre" clé : donc le quiz
    as: 'quizList'
});


module.exports = {
    Quiz,
    User,
    Question,
    Level,
    Answer, 
    Tag
}