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

  // Creation of table
  // See description of table in dataType file
  await db.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      note TEXT,
      isActive INTEGER DEFAULT 1
    );
  `);
};

