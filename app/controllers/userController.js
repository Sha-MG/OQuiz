const emailValidator = require("email-validator");
const bcrypt = require('bcrypt');

const { User } = require("../models/index.js");

const userController = {

    signupPage(request,response) {
        response.render('signup');
    },

    async createUser(request, response) {
        // cette méthode est apellée lorsque le formulaire est envoyé
        // ici j'ai accès aux infos du fomulaire dans resquest.body (car on est passé via une méthode POST)
        // on s'assure qu'on a bien un body parser dans index.js
        const body = request.body;

        // Vérifier les cas d'erreurs

        // 1- toutes les infos nécessaires ne sont pas présentes
        if (!body.firstname || !body.lastname || !body.email) {
            response.render('signup', {
                error: "Toutes les infos nécessaires n'ont pas été transmises."
            });
        }

        // 2- le format d'email n'est pas valide
        if (!emailValidator.validate(body.email)) {
            response.render('signup', {
                error: "Cet email n'est pas valide."
            });
        }

        // 3- le mdp et la confirmation ne correspondent pas
        if (body.password !== body.confirmation) {
            response.render('signup', {
                error: "Le mot de passe et sa confirmation ne correspondent pas."
            });
        }

        // 4- l'utilisateur existe déja dans la BDD
        // on va donc faire une recherche dans la bdd pour voir si on a déja un profil avec cet email
        const userFound = await User.findOne({ 
            where: { email: body.email } 
        });
        if (userFound) {
            response.render('signup', {
                error: "Cet email est déja utilisé par un utilisateur."
            });
        }

        // 5- si on avait le courage on pourrait vérifier que le mot de passer répond au recommendations de la cnil, avec une regex par exemple

        // si on arrive ici, c'est que tout est OK !
        // on va créer l'utilisateur dans la BDD

        // d'abbord on encrypte le mot de passe : 
        // le salt = un mot de passe qui intervient dans l'encryptage pour rendre le décryptage encore plus difficile. Il ressemble à : fhfhfjf225%!#hefiohoih
        // on précise en second prarmètre un nombre qui dicte la taille du salt
        // plus c'est kong, mieux c'est encrypté,mais plus ça prend du temps
        const encryptedPwd = bcrypt.hashSync(body.password, 10);
        console.log(encryptedPwd);

        await User.create({ 
            firstname: body.firstname, 
            lastname:  body.lastname,
            email:  body.email,
            // password:  body.password, // NON !!! on n'envoie pas le mot de passe en clair dans la db !! 
            password: encryptedPwd,
            // Gestion des roles : on ajoute le role par default : membre
            role: 'membre'
        });

        response.redirect("/login");
    },

    loginPage(request, response) {
        response.render('login');
    },

    async loginUser(request, response) {
        // ici on a accès aux informations rentrées par l'utilisateur dans le formulaire

        // 1. récupérer les infos du form
        const email = request.body.email;
        const password = request.body.password;
        // autre notation :
        // request.body ressemble à ceci : 
        // request = {
        //     body: {
        //         email: "toto@gmail.com",
        //         password: "azerty"
        //     }
        // }
        // on peut accéder aux élément email et password comme ceci : 
        // const { email, password } = request.body;


        // 2. on vérifie que cet utilisateur existe dans la db avec cet email 
        const userFound = await User.findOne({ 
            where: { email } 
        });
        if (!userFound) {
            return response.render('login', {
                error: "Aucun utilisateur n'existe avec cet email."
            });
            // on "return", car on ne veut pas continuer l'execution du code
        }

        console.log(userFound);

        // si on arrive ici c'est que l'utilisateur exista dans la db (le return arrête l'execution du code)
        // 3. on vérifie aussi le password
        // mot de passe stocké dans la db : userFound.password => il est crypté
        // mot de passe entré dans le formulaire : password => il n'est PAS crypté
        // on compareles 2 avec la méthode "compare" de bcrype (qui est asynchrone !)
        const validPwd = await bcrypt.compare(password, userFound.password);
        // validPwd est true si le password est validé, false sinon
        if (!validPwd) {
            return response.render('login', {
                error: "Mot de passe invalide."
            });
            // on "return", car on ne veut pas continuer l'execution du code
        }

        // 4. gérer la persistance de la connexion
        // pour ceci on va stocker l'utilsateur dans une session
        // on ajoute express-session qui gère tout ça pour nous (go : index.js)
        // maintenant l'objeet request a une nouvelle pripriété "session"
        // request = {
        //     body: {
        //         email: "toto@gmail.com",
        //         password: "azerty"
        //     },
        //     session: {
                // ici : on peut ranger les infos qu'on veut !
                // user: {
                //     firstname: "Flore",
                //     lastname: "Oclock"
                // }
        //     }
        // }
        // on sauvegarde l'utilisateur dans la session :
        request.session.user = userFound;
        // bonne pratique : on supprime quand même son mot de passe (même crypté)
        delete request.session.user.password;

        // si le mot de passe est valide,on redirige :
        response.redirect('/');

        // grâce à la session, n'importe où (dans le JS) on peut faire request.sessions.user.firstname par exemple, pour avoir le nom de l'utilisateur connecté !
        // ce serait pas mal d'y avoir accès dans toutes les views
        // on peut ranger ces infos dans "locals" = on y aura accès dans toutes les views (tous les fichiers ejs)
        // => l'idéal est de le faire dans un middleware (allons le faire dans userMiddleware.js, et l'utiliser dans index.js)
    },

    profilePage(request, response) {
        if (!request.session.user) {
            return response.redirect('/login');
        }
        response.render('profile');
    },

    logout(request, response) {
        // je supprime ma session utilisateur
        request.session.user = false;
        response.redirect('/');
    }
}

module.exports = userController;