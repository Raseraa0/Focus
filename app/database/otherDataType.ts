import { ExercisesType, LabelType, PresetSessionType, SetsType } from "./dataType";

/**
 * @name ExercisesExpandType
 * 
 * This type contains informations after the join
 * of exercises and labels table
 * 
 */
export type ExercisesExpandType = ExercisesType & {
    // Contains all fields from ExercisesType

    // List of labels
    labels?: LabelType[];

    sets?: SetsType[];

}

export type PresetSessionsExpandType = PresetSessionType & {

    exercises: ExercisesExpandType[];
}
