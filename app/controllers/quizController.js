const { Quiz } = require("../models");

const quizController = {
    async quizPage(request, response) {
        // on veut récupérer le quiz sur lequel on est
        // on est sur une route paramétrée,on a donc accès aux paramètres de la route, avec request.params
        // ce que je récupère depuis d'url c'est un string, j'ai besoin d'un nombre, donc je la parse :
        const quizId = parseInt(request.params.id);

        const quiz = await Quiz.findByPk(quizId, {
            include: [
                "author", 
                "tags", 
                { 
                    association: "questions",
                    include: ["level", "propositions"]
                }
            ]
        });

        console.log(quiz);
        // on a récupéré notre quiz, on le passe en paramètre à la vue :
        response.render('quiz', { quiz });
    }
}

module.exports = quizController;