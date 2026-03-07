import * as SQLite from 'expo-sqlite';

/**
 * @name openDatabase
 * 
 * @returns Connexion to the project database
 */
export const openDatabase = async () => {
  return await SQLite.openDatabaseAsync('focus_db');
};



/**
 * @name initDatabase
 * 
 * Initialisation of the database with all the table
 * The table are created only if they are not already
 * existing
 */
export const initDatabase = async () => {

  // Open connexion
  const db = await openDatabase();

  // ----------------------
  // WARNING this part is to delete table when I change there structure
  // (useful when changing structure of table)
  // If it is needed to keep the data in table,
  // please use ALTER TABLE

  // await db.execAsync('DROP TABLE IF EXISTS exerciselabellink')
  // await db.execAsync('DROP TABLE IF EXISTS presetsessionexercise')
  // await db.execAsync('DROP TABLE IF EXISTS exercises;');
  // await db.execAsync('DROP TABLE IF EXISTS sets')
  // await db.execAsync('DROP TABLE IF EXISTS presetsession')
  // await db.execAsync('DROP TABLE IF EXISTS labels;');

  // Creation of table
  // See description of table in dataType file
  await db.execAsync(`
    PRAGMA foreign_keys = ON;
    
    -- Exercises 
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      note TEXT,
      isActive INTEGER DEFAULT 1
    );
  
    -- Labels
    CREATE TABLE IF NOT EXISTS labels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );

    -- Link between Exercises and Labels
    CREATE TABLE IF NOT EXISTS exerciselabellink (
      exercise_id INTEGER NOT NULL,
      label_id INTEGER NOT NULL,
      PRIMARY KEY (exercise_id, label_id),
      FOREIGN KEY (exercise_id) REFERENCES exercises (id) ON DELETE CASCADE,
      FOREIGN KEY (label_id) REFERENCES labels (id) ON DELETE CASCADE
    );

    -- Table principale des sessions (Header)
    CREATE TABLE IF NOT EXISTS presetsession (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      note TEXT,
      isActive INTEGER DEFAULT 1
    );

    -- Table de liaison entre Session et Exercice (Contenu de la session)
    CREATE TABLE IF NOT EXISTS presetsessionexercise (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      preset_id INTEGER NOT NULL,
      exercise_id INTEGER NOT NULL,
      position INTEGER NOT NULL,
      FOREIGN KEY (preset_id) REFERENCES presetsession (id) ON DELETE CASCADE,
      FOREIGN KEY (exercise_id) REFERENCES exercises (id) ON DELETE CASCADE
    );

    -- Table des séries (Détails de chaque exercice dans une session)
    CREATE TABLE IF NOT EXISTS sets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      preset_exo_id INTEGER NOT NULL,
      position INTEGER NOT NULL,
      reps TEXT, -- Stocké en texte pour permettre des formats comme "10-12" ou juste "12"
      FOREIGN KEY (preset_exo_id) REFERENCES presetsessionexercise (id) ON DELETE CASCADE
    );
  `);
};

