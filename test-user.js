// on require dotenv
require("dotenv").config();
// on require notre classe Level
const User = require('./app/models/user.js');

async function main() {
    // INSERT
    // const newUser = new User({
    //     firstname: "Bob",
    //     lastname: "Marley",
    //     email: "bob@gmail.com",
    //     password: "abcd"
    // }); // newUser est une instance de la classe User
    // on a donc accès à la méthode "insert" sur cet objet
    // await newUser.insert();


    // UPDATE
    // newUser.password = "2134#5ergrtgerfg354eg364%$";
    // newUser.update();

    // FIND ONE
    const newUser = new User({
        firstname: "Bob",
        lastname: "l'éponge",
        email: "spongeBob@gmail.com",
        password: "azerty"
    }); 
    await newUser.insert();
    
    // const user = await User.findOneById(newUser.id);
    // // ici je récupère un user qui est une instance de la classe User
    // // je peux onc utiliser toutes mes méthodes Active Record sur cet user :
    // user.password = "passwordcompliqué";
    // user.update();

    // FIND ALL
    // findAll est une méthode static donc on l'apelle sur la classe User, et non sur une instance de la classe
    const users = await User.findAll();
    // console.log(users);

    // DELETE
    await newUser.delete();
    const deletedUser = await User.findOneById(newUser.id);
    console.log(deletedUser); // devrait être null puisqu'on vient de le supprimer !
};

main();