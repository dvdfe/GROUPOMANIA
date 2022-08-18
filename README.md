# GROUPOMANIA

Groupomania est réseau social d'entreprise où l'on peut se créer un compte, créer et supprimer une publication ou un commentaire. 

- Version de node utilisé pour le projet : v14.17.0
- Version de npm utilisé pour le projet : 6.14.13
- Version de vue utilisé pour le projet : 3.2.33

Prérequis:
- npm 
- node

Installation et déploiement du backend:
- Accéder au dossier back du projet: cd back
- Installer les dépendences du backend en exécutant la commande : npm install
- Créer un dossier "uploads" : mkdir uploads
- Créer un fichier ".env" : touch .env
- Y ajouter MDP=456456
- Aller sur le site https://planetscale.com/, cliquer sur le bouton "Get Started"
- Créer un compte sur le site, allez au bout des explications et appuyer sur le bouton "Create your first database"
- Creer un nom pour la base de donnée dans le formulaire "Name" et appuyer sur le bouton "Create database"
- Appuyer sur le bouton "Connect"
- Appuyer sur le menu déroulant à droite de "Connect with", selectionner "Prisma"
- Appuyer sur "New password"
- Copier la chaîne de caractère en dessous de .env 
- Ajouter au fichier .env du dossier back les informations copiées
- Accéder au dossier back du projet et exécuter la commande "npx prisma db push"
- Démarrer le serveur du backend en exécutant la commande : node index ou la commande nodemon index(si la commande nodemon est disponible sur votre ordinateur) 
Votre application backend est maintenant lancé sur le port 3001. Vous pouvez y accéder via l'url : localhost:3001

Installation et déploiement du frontend: 
- Accéder au dossier front du projet: cd front
- Installer les dépendences du frontend en exécutant la commande : npm install
- Démarrer le serveur du frontend en exécutant la commande : npm run dev
Votre application frontend est maintenant lancé sur le port 3000. Vous pouvez y accéder via l'url : localhost:3000

