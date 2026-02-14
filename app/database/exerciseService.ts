import { ExercisesType } from './dataType';
import { openDatabase } from './db';

/**
 * @name addExercise
 * 
 * Add an exercise to the exercises table
 * 
 * @param name Name of the exercise
 * @param note Note of the exercise
 * @returns Id of the inserted row
 */
export const addExercise = async (name: string, note: string) => {
    const db = await openDatabase();
    const result = await db.runAsync('INSERT INTO exercises (name,note) VALUES (?,?);', [name, note]);
    return result.lastInsertRowId;
};


/**
 * @name getExercises
 * 
 * Get all exercises from the table exercises
 * 
 * @returns A list of all the table data
 */
export const getExercises = async () => {
    const db = await openDatabase();
    return await db.getAllAsync<ExercisesType>('SELECT * FROM exercises;');
};