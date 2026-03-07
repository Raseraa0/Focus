import { ExercisesExpandType } from "../database/otherDataType";


export const textFilterEx = (exercises: ExercisesExpandType[], text: string) => {

    const lowerText = text.toLowerCase().trim();

    if (lowerText === "") {
        return exercises
    }

    const filtered = exercises.filter((item) => {
        return item.name.toLowerCase().includes(lowerText);
    })

    return filtered;
}