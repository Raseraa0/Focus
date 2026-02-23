import { ExercisesType, LabelType } from "./dataType";

/**
 * @name ExercisesWithLabelsType
 * 
 * This type contains informations after the join
 * of exercises and labels table
 * 
 */
export type ExercisesWithLabelsType = ExercisesType & {
    // Contains all fields from ExercisesType

    // List of labels
    labels: LabelType[];

}