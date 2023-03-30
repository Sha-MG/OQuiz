# oQuiz - Challenge jour 4 : Sequelize

On a un super ORM, on créé des models ?

Créer le model Question. Une fois que c'est fait, vérifier que tout fonctionne en écrivant quelques tests dans `test-sequelize-models.js` :

- Trouver toutes les questions
- Trouver la question dont l'id est 5
- Créer un Level avec le nom "méga difficile" et l'insérer en BDD

### Bonus

Créer aussi les autre models

### Bonus (chaud bouillant, même pour du piment)

Récupérer une Question avec son Level associé
(Allez voir du cpoté de la DOC, par ici : https://sequelize.org/docs/v6/core-concepts/assocs/)


------------------------------------------------

# oQuiz - Challenge jour 3 : Active Record

Nous avons commencé à coder les méthodes Active Record du modèle `Level`.

On a pu vérifier que ces méthodes fonctionnent en jouant dans `testModels.js` et `test-level.js`

En s'inspirant (très largement) de ce code existant, codez les méthodes `insert` et `findAll` du modèle `User` : 
- `insert()` : qui insert l'instance courante dans la base de données.
- `findAll()` : qui trouve tous les Users dans la base de données.
- `update()`, qui met à jour l'instance courante dans la base de données.
- `delete()`, qui supprime l'instance courante de la base de données.


Vérifier que ces méthodes fonctionnent en créant un fichier `test-user.js`

### Bonus :

Essayez de coder les méthode manquante sur le modèle `Level`.

Au final ou voudrait toutes ces méthodes :

- `findAll()`, qui trouve tous les Levels dans la base de données.
- `findOneById(id)`, qui trouve un Level en fonction de son ID.
- `insert()`, qui insert l'instance courante dans la base de données.
- `update()`, qui met à jour l'instance courante dans la base de données.
- `delete()`, qui supprime l'instance courante de la base de données.


### Méga Bonus : 

Commencer à réfléchir pour factoriser tout ce code (c'est-à-dire coder toutes les méthodes Active Record dans CoreModel !)


-----------------------------------------

# oQuiz - challenge jour 2 : Le début du commencement

Pour commencer, il faut mettre en place la base de données !

Les choses à faire, dans l'ordre :

- Créer un utilisateur PostgreSQL, nommé "oquiz", avec un mot de passe et les droits nécessaires.
- Créer une base de données nommée "oquiz", dont le propriétaire est l'utilisateur "oquiz".
- Créer les tables grâce au fichier "data/create_tables.sql".
- Importer les données grâce au fichier "data/insert_data.sql"

<details>
<summary>Je me rappelle plus trop des commandes...</summary>

### Créer un utilisateur PostgreSQL, nommé "oquiz", avec un mot de passe et les droits nécessaires.

- d'abord se connecter à PostgreSQL en tant que "postgres": `sudo -i -u postgres`, puis `psql`
- Ou directement si cela est déjà configurer dans le `pg_hba.conf` vous pouvez directement untiliser la commande `psql -U postgres`
- puis créer l'utilisateur : `CREATE ROLE oquiz WITH LOGIN PASSWORD 'oquiz';`

### Créer une base de données nommée "oquiz", dont le propriétaire est l'utilisateur "oquiz".

- puis créer l'utilisateur : `CREATE DATABASE oquiz OWNER oquiz;`

### Créer les tables grâce au fichier "create_tables.sql".

- `psql -U oquiz -f data/create_tables.sql`

### Importer les données grâce au fichier "insert_data.sql".

- `psql -U oquiz -f data/insert_data.sql`

</details>

On pourra ensuite se connecter à la BDD dans le code via l'url : `postgres://oquiz:oquiz@localhost/oquiz`


## Du code classe !

Créer un dossier `app`, puis un sous-dossier `app/models`.

Dans ce dossier, on va coder des classes à partir du MCD du projet :

- une classe par entité: `Answer`, `Level`, `Question`, `Quiz`, `Tag`, et `User`
- une seule classe par fichier ! Le fichier porte le même nom que la classe, en minuscule.

Dans chaque classe :

- déclarer une propriété pour chaque champ de la table correspondante.
- coder un `constructor` qui prend en paramètre un objet. Cet objet contient toutes les valeurs à recopier dans l'instance.
- ne pas oublier d'exporter la classe !


⚠️ : le constructeur reçoit un objet avec les params (et pas la liste direct) => idem ce qu'on recevra de la BDD

<details>
<summary>Heuuu oui... t'as un exemple ?</summary>

Le but, c'est d'arriver à faire ça :

```JS

const monTag = new Tag({
  name: "un super tag",
});
```

On devrait donc avoir un truc dans ce genre :

```JS
class Tag {
  constructor(obj) {
    this.name = obj.name;
  }
};
```

</details>

## Do not repeat yourself

La propriété `id` est présente dans toutes les classes.

On va donc... les factoriser ! Et pour ce faire, on va utiliser l'héritage !

On va donc coder une class `CoreModel`, dans le même dossier que les autres, et toutes les classes vont _hériter_ de celle-ci :

- Penser à exporter `CoreModel`.
- Penser à require `CoreModel` dans les autres fichiers.
- Penser à appeler le "constructeur parent" dans les constructeur des classes.

## Get/Set

Dans chaque classe, à commencer par `CoreModel`, coder un "getter" et un "setter" par propriété en y ajouter les instruction voulues.
(pas forcément TOUS !)

<details>
<summary>Un exemple </summary>

```JS
class CoreModel {
  _id;

  get id() {
    return this._id;
  };

  set id(value) {
    this._id = value;
  };
};
```

</details>

## Bonus : ne pas autoriser de valeurs absurdes

Dans les "setters", rajouter des tests pour vérifier que la donnée passée en argument est au moins du bon type.

<details>
<summary>Un exemple</summary>

```js
class CoreModel {
  #id;

  set id(value) {
    if(isNaN(parseInt(value, 10))) {
      throw Error("CoreModel.id must be a integer !");
      // on "lève" une erreur => ça arrête tout !
    }
    this.#id = value;
  }
};
```

</details>


----------------------------------------------------



# oQuiz - challenge jour 1

En utilisant l'analyse préliminaire de la BDD, le MCD, et les fiches récap, écrire le MLD de l'application.

Rappel : la difficulté de cet exercice réside dans le fait de traduire les associations entre les entités, en termes de clé primaire / clé étrangère / table de liaisons, selon les cardinalités spécifiées dans le MCD.

## Bonus - SQL

Écrire le fichier SQL pour créer les tables listées dans le MLD.


## Bonus  2 - Setup BDD

Créer un utilisateur et une BDD pour le projet `oquiz` dans Postgres, à l'aide des [commandes habituelles](https://kourou.oclock.io/ressources/fiche-recap/postgresql/)

---


Fiches récap :

MCD : https://kourou.oclock.io/ressources/fiche-recap/mcd-modele-conceptuel-de-donnees/


MLD : https://kourou.oclock.io/ressources/fiche-recap/mld/
# OQuiz
