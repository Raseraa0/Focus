/** Exercises stored in the database */
export type ExercisesType = {
    id: number;
    name: string;
    note?: string;          // optional extra info
    isActive: number;       // 1 active, 0 soft-deleted
}


/** Available labels to categorize exercises */
export type LabelType = {
    id: number;
    name: string;
}


/** Links exercises to labels (many-to-many) */
export type ExerciseLabelLinkType = {
    exercise_id: number;
    label_id: number;
}


/** Preset workout session templates */
export type PresetSessionType = {
    id: number;
    name: string;
    description: string;
    isActive: number;       // 1 active, 0 soft-deleted
}


/** Exercises included in a preset session */
export type PresetSessionExerciseType = {
    preset_id: number;
    exercise_id: number;
    position: number;       // order in session
    setnr: number;          // number of sets
}


/** Workout session header */
export type WorkoutType = {
    id: number;
    date: Date;
    preset_id: number;
    status: number;         // 1 done, 0 draft, -1 aborted
    global_feeling: string;
    note: string;
}


/** Exercises performed during a workout */
export type WorkoutExerciseType = {
    workout_exercise_id: number;
    workout_id: number;
    position: string;       // order in workout
    exercise_id: number;
    note: string;
    pain_flag: number;      // 1 pain felt, 0 none
}


/** Performance data for each set */
export type SetPerformanceType = {
    workout_exercise_id: number;
    set_index: number;
    reps: number;
    weight: number;
    completed: number;      // 1 completed, 0 failed
}


/** Default preset linked to a weekday */
export type DefaultDayPresetType = {
    day_of_week: number;    // 1 Monday ... 7 Sunday
    preset_id: number;
}