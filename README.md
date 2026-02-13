TODO TODO TODO
Finir de faire les truc de la abse de données, genre les commentaire et completer (meme si c'est commenter)
la structure de la base de données
TODO TODO TODO

Split en un maximum de fichier par exemple data base genre entre les class et les fonction
Puis meme apres tt les composant et tt

idée ajout pour après:
couleur pour les label ?
Possibilité de créer une session a partir d'une séance qui a été modifier
Statistique avancé
Pour ce qui est du nombre de réppétition et du nombre de série, plutot que de faire un simple champ input, essyayer peut etre de juste faire un espace de scroll vertical (genre comme le select des date de naissance)
Pour les truc rep/charge, mettre une option pour dupliquer pcq souvent les rep sont les mêmes

# Ecran 1 : Main

- Bouton voir statistique -> Ecran 2
- Bouton lancer une séance -> Ecran 3
- Bouton configurer séance -> Ecran 4
- Bouton paramètre -> Ecran 5

# Ecran 2 : Séance prep

- Champs en haut qui indique la date d'aujourdhui (possibilité de changer la date si on veut reccord une seance pour un autre jours que aujourdhui)
- Choisir un preset dans session parmis la liste des presets disponibles (le preset par defaut du jours est affiché s'il existe)
- Ensuite ça envoit sur écran 21.

# Ecran 21 : Séance

- Afficher une liste des exos dans mis dans le preset + un element qui permet d'ajouter un exo
  (si pas de preset selectionné, juste afficher le bouton ajout exo)
- Si j'appuis sur ajouter un exo -> Ecran 211
- Possibilité de supprimer un exo (avec confirmation)
- Possibilité de cliquer sur un exo (pour dire qu'on va le faire) -> Ecran 212

# Ecran 211 : Add Exo

- Afficher tout les exo présent dans exo
- Possibilité de filtrer par label (si plusieur label, mettre AND ou OR)
- Possibilité de créer un Exo ici -> Ecran 32

# Ecran 212 : Do Exo

- Je vois afficher le nom de l'exo, une photo ?, une description ou je me met les note que je veux
- Je vois des info relative a ma dernière séance sur cette exo, pour voir les charge que j'avais
- Je vois un warning si ça fait longtemps que je stagne sur cette exo ?
- J'ai la possibilité de rentrer ce que j'ai fais par exemple 8 rep 30 kg et comme ça j'ai tt les data de chaque série (je peux préremplir ou proposer des preset genre c'est pas juste un input, c'est une liste je peux cliquer sur 7 rep 8 rep 9 rep 10 rep ou écrire ce que je veux)
  TODO
- Je peux cocher une case imprévue (et dire douleur épaule, )
- J'ai la possibilité de laissé un retour sur mon exo si besoin
- Je peux dire si j'ai eu mal quelque part
- A la fin je valide l'exo en mode terminé

# Ecran 3 : Config

- possibilité de créer/modifier une session -> Ecran 31
- possibilité de créer un exo -> Ecran 32
- possibilité de modifier un exo -> Ecran 33

# Ecran 31 : Create modify session

- Remplissage du nom
- Remplissage de la description
- Ajout d'exo, avec possibilité de créer des exo -> Ecran 32

# Ecran 32 : Create Exo

- remplir note, label nom etc

# Ecran 33 : Modifier exo

- modif note, label nom etc

# Ecran 4 : Stat

- Possibilité de voir un espace de calendrier avec les jours ou j'ai fais une séance (coloration en fonction du preset)
- Possibilité de voir, sur 1 exo, la progression

# Ecran 5 : Paramètre

Présentation comme les parametre des manière général

- Une possibilité d'exporter les données au format JSON

# DATA

Exercise

- id
- name
- note
- image_path
- is_active

ExoLabel

- id
- name

SessionLabel

- id
- name

ExerciseLabel

- exercise_id
- label_id

PresetSession

- id
- name
- description
- label

PresetSessionExercise

- preset_id
- exercise_id
- position

WorkoutSession

- id
- date
- preset_id (nullable)
- status (draft / completed / aborted)
- global_feeling
- note

WorkoutExercise

- id
- session_id
- exercise_id
- note
- pain_flag

SetPerformance

- id
- workout_exercise_id
- set_index
- reps
- weight
- completed

PainEvent

- workout_exercise_id
- comment

DefaultDayPreset

- day_of_week
- preset_id
