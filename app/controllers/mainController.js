
const { Quiz } = require('../models/index.js');

const mainController = {

	async renderHomePage(req, res) {
		try {
			// c'est ici que je veux récupérer mes quiz, pour pouvoir les passer à la vue "home" et donc les afficher dans la page d'accueil
			const quizList = await Quiz.findAll({
				// include permet de demander à Sequelize de récupérer les liées par une association (précisées dans models/index.js)
				// ici on récupère le user qui est lié par la clé étrangère qu'on a nommé "author" :
				include: ["author", "tags"],
				order: [['title', 'ASC']]
			});

			// console.log(quizList);

			res.render("home", { quizList });

		} catch (error) {
			console.error(error);
			res.status(500).render('500');
		}
	}
};

module.exports = mainController;
