import { LabelType } from "./dataType";

export type ExercisesWithLabelsType = {

    id: number;

    name: string

    note?: string

    isActive: number;

    labels: LabelType[];

}