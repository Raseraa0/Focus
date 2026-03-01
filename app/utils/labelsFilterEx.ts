import { LabelType } from "../database/dataType";
import { ExercisesWithLabelsType } from "../database/joinDateType";

export const labelsFilterEx = (exercises: ExercisesWithLabelsType[], labels: LabelType[]) => {

    if (labels.length === 0) {
        return exercises
    }

    const filtered = exercises.filter((exo) => {
        return labels.every((lab) => {
            return exo.labels.some((exolab) => exolab.id === lab.id)
        })
    })

    return filtered;
}