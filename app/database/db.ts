import * as SQLite from 'expo-sqlite';

// Ouverture de la base de données
export const openDatabase = async () => {
  return await SQLite.openDatabaseAsync('focus_db');
};


// Initialisation des tables si pas déjà créé

export type ExercisesType = {
  id: number;
  name: string
  note?: string
  isActive: number
}

export const initDatabase = async () => {
  const db = await openDatabase();

  //CA CA RESET LES DONNEES
  // await db.execAsync('DROP TABLE IF EXISTS exercises;');

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

