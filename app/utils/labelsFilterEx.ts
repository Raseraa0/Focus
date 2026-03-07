import { LabelType } from "../database/dataType";
import { ExercisesExpandType } from "../database/otherDataType";

export const labelsFilterEx = (exercises: ExercisesExpandType[], labels: LabelType[]) => {

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