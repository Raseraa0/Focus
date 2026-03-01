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


export const updateExercise = async (exerciseID: number, name: string, note: string, labelsID: number[]) => {
    const db = await openDatabase();

    // 1. Mettre à jour les informations de base de l'exercice
    await db.runAsync(
        'UPDATE exercises SET name = ?, note = ? WHERE id = ?;',
        [name, note, exerciseID]
    );

    // 2. Supprimer tous les anciens liens de labels pour cet exercice
    // C'est plus simple que de calculer les différences (ajouts/suppressions)
    await db.runAsync('DELETE FROM exerciselabellink WHERE exercise_id = ?;', [exerciseID]);

    // 3. Insérer les nouveaux liens de labels
    const promises = labelsID.map(async (labelId) => {
        await db.runAsync(
            'INSERT INTO exerciselabellink (exercise_id, label_id) VALUES (?, ?);',
            [exerciseID, labelId]
        );
    });

    await Promise.all(promises);

    return true;
};