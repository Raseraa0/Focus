import { LabelType } from './dataType';
import { openDatabase } from './db';

/**
 * @name addLabel
 * 
 * Add a label to the labels table
 * 
 * @param name Name of the label
 * @returns Id of the inserted row
 */
export const addLabel = async (name: string) => {
    const db = await openDatabase();
    const result = await db.runAsync('INSERT INTO labels (name) VALUES (?);', [name]);
    return result.lastInsertRowId;
};


/**
 * @name getLabels
 * 
 * Get all labels from the table labels
 * 
 * @returns A list of all the table data
 */
export const getLabels = async () => {
    const db = await openDatabase();
    return await db.getAllAsync<LabelType>('SELECT * FROM labels;');
};

export const getLabelsByExercise = async (exoID: number): Promise<LabelType[]> => {
    const db = await openDatabase();
    const query = `
    SELECT l.id, l.name 
    FROM labels l
    JOIN exerciselabellink ell
        ON l.id = ell.label_id
    WHERE ell.exercise_id = ?
  `;

    // Remplacer 'db' par ton instance de base de données
    return await db.getAllAsync(query, [exoID]);
}