const { Tag } = require("../models");

const tagController = {
    async tagPage(request, response) {
        // on veut récupérer la liste des tags

        const tagList = await Tag.findAll({
            include: ['quizzes']
        });

        console.log(tagList);

        // on a récupéré notre liste de tags, on la passe en paramètre à la vue :
        response.render('tags', { tagList });
    }
}

module.exports = tagController;