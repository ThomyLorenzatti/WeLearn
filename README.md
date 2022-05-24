# WeLearn Hackathon Starton

## Problème
*Quel problème votre projet résout-il ? Comment s'inscrit-il dans le thème "Construire un avenir décentralisé" ?*

Les formations, qu'elles soient en ligne ou physique et quelque soit leur domaine, ne sont pas accessible à tous facilement. Grâce à WeLearn, plateforme décentralisée, les utilisateurs ont la possibilité d'achter/vendre des formations de manière simple et sécurisée avec nos tokens LRN.
En effet, ces tokens facilitent tous les échanges. De plus, la technologie Web3 permet aux utilisateurs de réellement posséder leurs certificats d'aptitude grâce à la blockchain BSC. Les utilisateurs de la plate-forme feront vivre la plateforme, le tout sans aucune intervention humaine.

## Solution
*Comment avez-vous résolu ce problème ? Quelles technologies avez-vous utilisé ? Quel a été le plus grand défi technique, comment votre solution le résout-elle ?*

Nous avons créé une marketplace décentralisée offrant des formations payantes avec des tokens LRN. Nous avons donc créé une pool de ces tokens
grâce au Smart Contract ERC20 proposé par Starton. Les utilisateurs ont accès à ces tokens en connectant leur wallet Metamask sur le site. Les utilisateurs
achetant les formations bénéficient d'un NFT servant de clé pour accéder au contenu de cette dernière. Le NFT a été créé grâce à un Smart Contract ERC721, en passant par l'API Starton.
Lorsque l'utilisateur termine le cours, il doit remplir un quiz créé par le créateur de la formation afin de valider son certificat, qui lui sera attribué sous forme de NFT ERC721. Ces NFT seront alors accessibles à l'utilisateur sur son wallet. Ces certificats son Open Source et donc accessibles à tous. Les
créteurs de contenu, eux, sont donc rémunérés par la vente de leur formation. Les formations de tous types hébergées par notre solution sont donc accessibles de manière simple grâce à nos tokens et à tous. Nous garantissons grâce au smart contract ERC721 la valeur de ce certificat, unique et non fongible. C'est ainsi une relation gagnant-gagnant entre "professeurs" et "élèves".

Notre plus grand défi technique a été la découverte de la technologie Web3 et sa compréhension en profondeur. De plus, nous avons du prendre en main l'API Starton, qui s'est avéré à la fin être un outil très puissant.

## Installation
*Expliquez, étape par étape, comment quelqu'un peut installer votre projet et l’utiliser Le jury utilisera principalement MacOS, Ubuntu, Android et iOS. Mettre en place un docker / docker-compose est une bonne idée pour permettre à quelqu'un de tester facilement le projet.*

Dans un premier temps, il est nécessaire de créer un fichier `.env` dans le dossier `we-learn-front` et `WeLearn-api`  
Dans le `.env` du dossier `we-learn-front`, il est nécessaire d'écrire la ligne suivante, en remplacement l'adresse par votre adresse locale:  
`VITE_REACT_URL = 'http://10.101.49.122:8080'`  

Dans le `.env` du dossier `WeLearn-api`, il est nécessaire d'écrire les lignes suivantes, sans les modifier:   
```
db_name=welearn
db_user=welearn
db_password=mangetafille
db_host=54.36.183.102
starton_key=BCyavFNFISpxz6F2QYvFFkjOHAsg2w0X
```
  
Il suffit simplement de lancer la commande suivante à la racine du projet :
`sudo docker build -t welearn ./`
  
Une fois cette commande lancée, la partie front-end et back-end sont prêtes!

## Équipe et commentaires
*Précisez le nom de votre équipe (le même que sur le discord), et dites-nous ce que vous avez appris durant ce hackathon !*

Team : WeLearn</br></br>

nathan.guiu@epitech.eu </br>
J'ai pour la première fois appris à développer des smarts contracts et créer des NFTs. Ça a été une super première pour moi. J'ai beaucoup appris en peu de temps et j'ai passé du super temps avec les autres membres de l'équipe. C'est le meilleur des hackathons que j'ai pu faire jusqu'à aujourd'hui et ça me donne envie de continuer dans ce domaine de la blockchain.

mathis.lorenzo@epitech.eu </br>
Ce Hackathon a été pour moi mon premier contact avec le fonctionnement des smart contract et des NFTs au niveau du code. j'ai du apprendre à m'adapter très rapidement à des langages que je ne connaissais pas. La communication entre les membres de l'équipe à été primordiale et nous avons su nous accorder rapidement. Je suis très fier de travail qu'on a pu accomplir tous ensemble en si peu de temps.

hugo1.rodrigues@epitech.eu </br>
Que dire ! De parts tout ces talks plus intéressants les un des autres j'ai pu confirmer le fait que mon avenir professionel va s'orienter sur la blockchain. Je suis très fiers de ce que nous avons accomplie ce week end avec l'équipe de WeLearn. J'ai pu apprendre énorméments de choses notamment sur les smarts contracts et j'ai eu l'occasion d'avoir des réponses à de nombreuses questions qui étaient présentes dans ma tete depuis de nombreux mois. Pour ma part ce fut de loin le hackathon le plus interessant au quel j'ai pu participer.

thomy.lorenzatti@epitech.eu </br>
Durant ce hackathon je ne m'attendais vraiment pas à progresser autant et découvrir tant de choses. Surtout que nous ne nous sommes pas facilité la tâche en choisissant des techno, qui n'étaient pas nos domaines de prédilection.

jimmy.agulla@epitech.eu </br>
Ce Hackathon a été pour moi une belle expérience. En effet, j'ai débuté avec très peu de connaissances dans le domaine. Nous avons trouvé un sujet qui m'a énormément intéressé, et au travers de ce dernier, j'ai pu acquérir énormément de connaissances techniques sur le monde du Web3. Nous avons également réussi à produire un travail conséquent sur ces deux jours grâce à notre très bonne organisation avec le reste de l'équipe, et je suis fier du travail produit.

## Rendu
* Fournissez une explication des fonctionnalités de vos projets. Vous devez obligatoirement lier une vidéo de démonstration et preciser avec screen recording et commentaire.

Nous avons un site web où les users peuvent créer ou acheter des formations grâce à
un token ERC20 que l'on a créé, le LRN. Notre plateforme permet aux formateurs et aux personnes qui cherchent à se former, de se retrouver sur une plateforme décentralisée.a
Les utilisateurs qui achètent une formation se verront bénéficier d'un NFT qui leur permet d'accéder au contenu de cette formation et les formateur recevront les tokens demandés.
Une fois que les utilisateurs finissent leur formation, ils pourront alors faire un examen fait par le formateur. Cet examen permet d'obtenir un nft de certification pour leur formation et l'autre nft est burn. Il est possible d'échanger des tokens avec d'autres personnes via Metamask ou d'autres wallets.

Si nécessaire, lire le GitBook accessible depuis la page d'acceuil du site web.

Vous pouvez vous donner des tokens LRN pour tester l'application en allant sur la route `/secret`. Ils vous suffit de rentrer l'adresse de votre Wallet et le nombre de tokens.

Vidéo : https://www.youtube.com/watch?v=aNOYfKv-ieY

(exemple: Loom , 4 minutes max)*.

## Présentation du Vendredi 13 Mai (4 minutes) 

*Pitch physique 

 *Pitch stream (ShareScreen/GoogleMeet)

nathan.guiu@epitech.eu </br>
mathis.lorenzo@epitech.eu </br>
hugo1.rodrigues@epitech.eu </br>
thomy.lorenzatti@epitech.eu </br>
jimmy.agulla@epitech.eu </br>
