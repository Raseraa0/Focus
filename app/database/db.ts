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

  // WARNING the lines bellow is to delete table 
  // (useful when changing structure of table)
  // If it is needed to keep the data in table,
  // please use ALTER TABLE
  // await db.execAsync('DROP TABLE IF EXISTS exercises;');
  // await db.execAsync('DROP TABLE IF EXISTS labels;');
  // await db.execAsync('DROP TABLE IF EXISTS exerciselabellink;');

  // Creation of table
  // See description of table in dataType file
  await db.execAsync(`
    PRAGMA foreign_keys = ON;
    
    -- Table des exercices
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      note TEXT,
      isActive INTEGER DEFAULT 1
    );
  
    -- Table des labels
    CREATE TABLE IF NOT EXISTS labels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );

    -- Table de liaison (Table de jointure)
    CREATE TABLE IF NOT EXISTS exerciselabellink (
      exercise_id INTEGER NOT NULL,
      label_id INTEGER NOT NULL,
      PRIMARY KEY (exercise_id, label_id),
      FOREIGN KEY (exercise_id) REFERENCES exercises (id) ON DELETE CASCADE,
      FOREIGN KEY (label_id) REFERENCES labels (id) ON DELETE CASCADE
    );
  `);
};

