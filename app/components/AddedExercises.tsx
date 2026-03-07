import { StyleSheet, View } from "react-native";
import { SetsType } from "../database/dataType";
import { ExercisesExpandType } from "../database/otherDataType";
import ExercisesTile2 from "./ExercisesTile2";

type Props = {
  exercises: ExercisesExpandType[];
  setExercises: (arg0: ExercisesExpandType[]) => void;
};

export default function AddedExercises({ exercises, setExercises }: Props) {
  const removeExercise = (exerciseID: number) => {
    const newExercises = exercises.filter((item) => item.id !== exerciseID);
    setExercises(newExercises);
  };

  const updateExercise = (id: number, seriesData: SetsType[]) => {
    const updated = exercises.map((ex) =>
      ex.id === id ? { ...ex, sets: seriesData } : ex
    );
    setExercises(updated);
  };

  return (
    <View style={styles.container}>
      {exercises.map((item) => (
        <ExercisesTile2
          key={item.id}
          id={item.id}
          name={item.name}
          note={item.note ?? ""}
          defaultSets={item.sets}
          isActive={item.isActive}
          onDelete={() => removeExercise(item.id)}
          onUpdate={(seriesData) => updateExercise(item.id, seriesData)}
        ></ExercisesTile2>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  item: {
    margin: 5,
    padding: 3,
    borderRadius: 8,
    backgroundColor: "#FF0000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
