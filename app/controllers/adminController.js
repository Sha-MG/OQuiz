const adminController = {
    adminPage(request, response) {
        // on veut tester si request.session.user existe, et si request.session.user.role est"admin"
        if (request.session.user?.role === "admin") {
            return response.render('admin');
            
        }
        response.redirect('/');
    }
}

module.exports = adminController;

// note : optional chaining :
// la syntaxe avec un "?" permet de vérifier l'existance d'une clé dans un objet avant de continuer à "avancer" dans l'arborescence de l'objet
// ceci : 
// request.session.user?.role === "admin"
// est équivalent à ceci: 
// request.session.user && request.session.user.role === "admin"