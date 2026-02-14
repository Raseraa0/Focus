
/**
 * @name ExercisesType
 * 
 * @table exercises
 * 
 * This table contains all informations relative
 * to exercises
 * 
 * @key id
 */
export type ExercisesType = {

    // Id of the exercise
    id: number;

    // Name of the exercise
    name: string

    // Additional note to add comment if needed
    note?: string

    // Default value is 1, become 0 when the
    // exercise is deleted, to keep informations
    // for statistics
    isActive: number;
}


/**
 * @name ExoLabelType
 * 
 * @table exolabel
 * 
 * This table contains all informations relative 
 * to labels
 * 
 * @key id
 */
export type ExoLabelType = {

    // Id of the label
    id: number;

    // Name of the label
    name: string;
}


/**
 * @name ExerciseLabelLinkType
 * 
 * @table exerciselabellink
 * 
 * This table is to link exercises and labels with their IDs
 * 
 * @key exercise_id
 * @key label_id
 */
export type ExerciseLabelLinkType = {

    // Id of the exercise
    exercise_id: number;

    // Id of the label
    label_id: number;
}


/**
 * @name PresetSessionType
 * 
 * @table presetsession
 * 
 * This table is the header table for preset session
 * 
 * @key id
 */
export type PresetSessionType = {

    // Id of the preset
    id: number;

    // Name of the preset
    name: string;

    // Description of the preset of needed
    description: string;

    // Default value is 1, become 0 when the
    // session is deleted, to keep informations
    // for statistics
    isActive: number;
}


/**
 * @name PresetSessionExerciseType
 * 
 * @table presetsessionexercise
 * 
 * This table is to know which exercise are in 
 * what session
 * 
 * @key preset_id
 * @key position
 */
export type PresetSessionExerciseType = {

    // Id of the preset
    preset_id: number;

    // Id of the exercise
    exercise_id: number;

    // Position of the exercise in the set
    position: number;

    // Number of set of this exercise
    setnr: number;
}

/**
 * @name WorkoutType
 * 
 * @table workout
 * 
 * This table is the header table of workout
 * 
 * @key id
 */
export type WorkoutType = {

    // Id of the workout
    id: number;

    // Date of the workout
    date: Date;

    // Id of the selected preset for this workout
    preset_id: number;

    // Status of the workout
    // 1 for completed
    // -1 for aborted
    // 0 for draft 
    status: number;

    // Feeling about the workout
    global_feeling: string;

    // Additional comment about the workout if needed
    note: string;

}


/**
 * @name WorkoutExerciseType
 * 
 * @table workoutexercise
 * 
 * This table is to know which exercise are in 
 * what workout
 * 
 * @key workout_exercise_id
 */
export type WorkoutExerciseType = {

    // Id of the workout_exercise
    workout_exercise_id: number;

    // Id of the workout
    workout_id: number;

    // Position of the exercise in the workout
    position: string;

    // Id of the exercice
    exercise_id: number;

    // Additional comment if needed 
    note: string;

    // 1 if they were pain during the exercice
    // 0 otherwise
    pain_flag: number;

}


/**
 * @name SetPerformanceType
 * 
 * @table setperformance
 * 
 * This table is for data of each set of an exercise in
 * a workout
 * 
 * @key workout_exercise_id
 * @key set_index
 */
export type SetPerformanceType = {

    // Id of the workout
    workout_exercise_id: number;

    // Index of the set in the exercise
    set_index: number;

    // Number of reps
    reps: number;

    // Weight
    weight: number;

    // 1 if this set was completed
    // 0 otherwise
    completed: number;

}


/**
 * @name DefaultDayPresetType
 * 
 * @table defaultdaypreset
 * 
 * This table is to link a favorite preset 
 * to a day of the week
 * 
 * @key day_of_week
 */
export type DefaultDayPresetType = {

    // Day of the week
    // 1 for Monday; 2 for Tuesday;...
    day_of_week: number;

    // Id of the preset session
    preset_id: number;

} 