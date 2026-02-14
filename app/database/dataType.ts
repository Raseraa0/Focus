
/**
 * @name ExercisesType
 * 
 * @table exercises
 * 
 */
export type ExercisesType = {

    // ID, primary key, autoincrement 
    id: number;

    // Name of the exercise
    name: string

    // Additional note to add comment if needed
    note?: string

    // Default value is 1, become 0 when the
    // exercise is deleted, to keep informations
    // for statistics
    isActive: number
}