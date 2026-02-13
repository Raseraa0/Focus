import { ExercisesType, openDatabase } from './db';

export const addExercise = async (name: string) => {
    const db = await openDatabase();
    const result = await db.runAsync('INSERT INTO exercises (name) VALUES (?);', [name]);
    return result.lastInsertRowId; // Retourne l'ID généré
};


export const getExercises = async () => {
    const db = await openDatabase();
    return await db.getAllAsync<ExercisesType>('SELECT * FROM exercises;');
};