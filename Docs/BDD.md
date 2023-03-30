## Conception BDD

> En autonomie : jusqu'à 12h00

# Liste des tables

- admin
- quiz
- theme
- question
- réponse
- niveau


# Relations entre les tables

Cardinalité possibles : 
(minimum, maximum)

(0, 1) = minimum 0, max 1
(1, 1) = un et un seul
(1, N) = minimum un, max plusieurs
(0, N) = minimum aucun, max plusieurs

Relation quiz/theme :
- un quiz peut avoir plusieurs thèmes (1,N)
- un theme est atribué à plusieurs quiz (0,N)

Relation quiz/admin :
- un quiz est créé par un admin (1,1)
- un admin peut crée plusieurs quiz (0,N)

Relation quiz/question :
- un quiz est composé de plusieurs question (0,N)
- une question appartient à un seul quiz (1,1)

Relation question/nivau :
- une question correspond à un niveau (1,1)
- un niveau a plusieurs questions (0,N)

Relation question/reponse :
- une question possède plusieurs réponses possibles (0,N)
- une reponse possible, appartient à une seule question (1,1)
ET
- une question possède une seule réponse JUSTE (1,1)
- un reponse valide une seule question (0,1)


On ve va PAS partir sur une solution comme ceci :
table quiz
question1
bonne réponse de la question 1
mauvause répnse 1 de la question 1
mauvause répnse 2 de la question 1
mauvause répnse 3 de la question 1
question2
question3
question4
question5


Plutpot un truc comme ceci :

table quiz                  
quiz1     
quiz2
quiz3

table de liaison quiz/question
quiz1 / q1
quiz1 / q2
quiz1 / q3

table question
q1 (clé étrangère : r2 (c'est la bonne réponse))
q2
q3

table de liaison question/response
q1 / r1
q1 / r2
q1 / r3
q2 / r4
q2 / r5

table reponse
r1
r2
r3
r4
r5