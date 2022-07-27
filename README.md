# GROUPOMANIA
Prérequis:
- npm 
- node

Installation et déploiement du backend:
- Accéder au dossier back du projet: cd back
- Installer les dépendences du backend en exécutant la commande : npm install
- Créer un dossier "uploads" : mkdir uploads
- Créer un fichier ".env" : touch .env
- Ajouter au fichier .env les informations suivantes : DATABASE_URL= URL_CONNEXION_BASE_DE_DONNEES_PLANETSCALE
- Remplacer la chaîne de caractère URL_CONNEXION_BASE_DE_DONNEES_PLANETSCALE, par l'url de connexion à votre base de données planet scale
- Démarrer le serveur du backend en exécutant la commande : node server ou la commande nodemon server(si la commande nodemon est disponible sur votre ordinateur) 
Votre application backend est maintenant lancé sur le port 3001. Vous pouvez y accéder via l'url : localhost:3001

Installation et déploiement du frontend: 
- Accéder au dossier front du projet: cd front
- Démarrer le serveur du frontend en exécutant la commande : npm run dev
Votre application frontend est maintenant lancé sur le port 3000. Vous pouvez y accéder via l'url : localhost:3000

