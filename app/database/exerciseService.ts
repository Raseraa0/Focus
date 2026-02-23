import { ExercisesType } from './dataType';
import { openDatabase } from './db';

/**
 * @name addExercise
 * 
 * Add an exercise to the exercises table
 * And for each labelID in labelsID, create an entry
 * in the table for link between these two table
 * 
 * @param name Name of the exercise
 * @param note Note of the exercise
 * @param labelsID List of labels ID linked ti this exercises
 * @returns Id of the inserted row
 */
export const addExercise = async (name: string, note: string, labelsID: number[]) => {
    const db = await openDatabase();
    const result = await db.runAsync('INSERT INTO exercises (name,note) VALUES (?,?);', [name, note]);

    const rowID = result.lastInsertRowId;

    const promises = labelsID.map(async (id) => {
        await db.runAsync('INSERT INTO exerciselabellink (exercise_id,label_id) VALUES (?,?);', [rowID, id]);
    })

    await Promise.all(promises)
    return rowID;
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

/**
 * @name deleteExercise
 * 
 * Delete the corresponding exercises from the database
 * 
 * @param id ID of the exercises we want to delete
 */
export const deleteExercise = async (id: number) => {
    const db = await openDatabase();
    try {
        await db.runAsync("DELETE FROM exercises WHERE id = ?;", [id]);
        console.log(`Exercice ${id} supprimé avec succès`);
    } catch (error) {
        console.error("Erreur lors de la suppression de l'exercice :", error);
        throw error;
    }
};