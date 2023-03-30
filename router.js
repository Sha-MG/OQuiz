const { Router } = require("express");
const mainController = require("./controllers/mainController.js");
const quizController = require("./controllers/quizController.js");
const tagController = require("./controllers/tagController.js");
const userController = require("./controllers/userController");
const adminController = require("./controllers/adminController");


const router = Router();

// page d'accueil
router.get("/", mainController.renderHomePage);

// page d'un quiz
router.get("/quiz/:id", quizController.quizPage);

// page des thèmes
router.get("/tags", tagController.tagPage);

// inscription
router.get("/signup", userController.signupPage); // quand j'arrive sur la page /signup
router.post("/signup", userController.createUser); // quand j'envoie le formulaire via le boutone s'inscrire, qui fait un POST

//connexion
router.get("/login", userController.loginPage); // quand j'arrive sur la page /login
router.post("/login", userController.loginUser); // quand j'envoie le formulaire via le boutone se connecter, qui fait un POST

// page de profil
router.get("/profile", userController.profilePage);

// déconnnexion
router.get("/logout", userController.logout);

// page d'admin
router.get("/admin", adminController.adminPage);

module.exports = router;
