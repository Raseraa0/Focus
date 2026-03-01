import { ExercisesWithLabelsType } from "../database/joinDateType";


export const textFilterEx = (exercises: ExercisesWithLabelsType[], text: string) => {

    const lowerText = text.toLowerCase().trim();

    if (lowerText === "") {
        return exercises
    }

    const filtered = exercises.filter((item) => {
        return item.name.toLowerCase().includes(lowerText);
    })

    return filtered;
}