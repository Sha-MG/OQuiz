// un petit MW pour tester si un user est conecté
// si c'est le cas on le rajouter dans response.locals
// ainsi on pourra utiliser la variable "user" dans toutes ls views sans se poser de question !

const userMiddleware = (request, response, next) => {
    if (request.session.user) {
        // on a la propriété user dans la session, c'est donc qu'un user est connecté
        response.locals.user = request.session.user
    } else {
        // on n'a pas d'user connecté
        response.locals.user = false;
    }
    // dauns un MW on n'oublie pas d'apeller next !
    next();
}

module.exports = userMiddleware;
// on va l'utiliser dans index.js