import { LabelType } from "../database/dataType";


export const textFilterLab = (labels: LabelType[], text: string) => {

    const lowerText = text.toLowerCase().trim();

    if (lowerText === "") {
        return labels
    }

    const filtered = labels.filter((item) => {
        return item.name.toLowerCase().includes(lowerText);
    })

    return filtered;
}